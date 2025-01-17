import React, { useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TextInput,
  StatusBar,
  Text,
  Alert,
  View,
  FlatList,
  Keyboard
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DictionaryResponse } from '@/models/DictionaryResponse';
import CancelButton from '@/components/CancelButton';
import { Attributes } from '@/models/Attribute';
import ItemView from '@/components/ItemView';
import NavigationBar from '@/components/NavigationBar'; // Import NavigationBar
import KeyComponent from '@/components/KeyComponent';

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState('');
  const [wordList, setWordList] = useState<DictionaryResponse[] | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      Alert.alert('Error', 'Please enter a search term.');
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await axios.post(
        'http://192.168.4.30:8000/lookup/sentence/async',
        { input: inputValue }
      );

      setTranslation(response.data.translation);

      const extractedData = response.data.words.map((item: DictionaryResponse) => ({
        word: item.word,
        lemma: item.lemma,
        english_meaning: item.english_meaning,
        pos: item.pos,
        base_meaning: item.base_meaning,
        transliteration: item.transliteration,
        attributes: item.attributes
      }));

      setWordList(extractedData);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'Something went wrong';
        Alert.alert(`Error ${status}`, status === 400 ? 'Bad Request. Input one Arabic word.' : message);
      } else {
        Alert.alert('Network Error', 'No response received from the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => setInputValue('');

  const renderItem = ({ item }: { item: DictionaryResponse }) => {
    let attributesWithType: Attributes;

    switch (item.pos) {
      case 'noun':
        attributesWithType = { type: 'noun', noun: item.attributes.noun };
        break;
      case 'verb':
        console.log(item)
        attributesWithType = { type: 'verb', verb: item.attributes.verb };
        break;
      case 'adjective':
        attributesWithType = { type: 'adjective', adjective: item.attributes.adjective };
        break;
      case 'pronoun':
        attributesWithType = { type: 'pronoun', pronoun: item.attributes.pronoun };
        break;
      case 'adverb':
        attributesWithType = { type: 'adverb', adverb: item.attributes.adverb };
        break;
      case 'preposition':
        attributesWithType = { type: 'preposition', preposition: item.attributes.preposition };
        break;
      case 'particle':
        attributesWithType = { type: 'particle', particle: item.attributes.particle };
        break;
      default:
        attributesWithType = { type: 'none' }
        console.warn('Unknown part of speech:', item.pos);
        break;
    }

    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <Text style={styles.transliterationText}>{item.transliteration}</Text>
          <Text style={styles.wordText}>{item.word}</Text>
        </View>
        <ItemView
          attributes={attributesWithType}
          item={{ lemma: item.lemma, base_meaning: item.base_meaning, transliteration: item.transliteration }}
        />
      </View>
    );
  };



  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <NavigationBar onMenuPress={() => console.log('Menu pressed')} onPlusPress={() => console.log('Plus pressed')} />

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="اُكتُب أَيَّ شَيءٍ"
          textAlign="right"
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSearch}
          returnKeyType="done"
        />
        <CancelButton onPress={handleClear} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : wordList ? (
        <View style={styles.stepContainer}>
          <Text style={styles.translationText}>{translation}</Text>
          <FlatList
            data={wordList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListFooterComponent={<KeyComponent />}
          />
        </View>
      ) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  translationText: {
    padding: 15,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Push word and transliteration to opposite ends
    alignItems: 'center', // Vertically center items
    width: '100%', // Ensure the row takes up the full width
  },
  wordText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'right',
    paddingBottom: 6
  },
  transliterationText: {
    color: '#666',
    textAlign: 'left',
  },
  meaningText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'right',
    paddingTop: 5
  },
  attributeText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'left',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
