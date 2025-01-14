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

  const renderItem = ({ item }: { item: DictionaryResponse }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.wordText}>{item.word} - {item.english_meaning}</Text>
      {item.word !== item.lemma || item.english_meaning !== item.base_meaning ? (
        <Text style={styles.meaningText}>{item.lemma} - {item.base_meaning}</Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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
          <Text>{translation}</Text>
          <FlatList
            data={wordList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      ) : null}
    </SafeAreaView>
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
  wordText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'right',
  },
  meaningText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'right',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
