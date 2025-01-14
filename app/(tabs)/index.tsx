import { StyleSheet, ActivityIndicator, TextInput, StatusBar, TouchableOpacity, Text, Alert, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from vector icons
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState('');
  const [wordList, setWordList] = useState(null); // State to store the fetched data
  const [translation, setTranslation] = useState(null); // State to store the fetched data
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      Alert.alert('Error', 'Please enter a search term.');
      return;
    }

    setLoading(true);
    try {
      const response: AxiosResponse = await axios.post(
        'http://192.168.4.30:8000/lookup/sentence/async',
        { input: inputValue }
      );

      setTranslation(response.data.translation);

      // Extract the "word" field from each item in the response
      const extractedData = response.data.words.map((item) => ({
        word: item.word,
        lemma: item.lemma,
        englishMeaning: item.english_meaning,
        pos: item.pos,
        baseMeaning: item.base_meaning,
      }));

      setWordList(extractedData);
    } catch (error: AxiosError | any) {
      if (error.response) {
        if (error.response.status === 400) {
          Alert.alert('Error 400', 'Bad Request. Input one Arabic word.');
        } else {
          Alert.alert(`Error ${error.response.status}`, error.response.data?.message || 'Something went wrong');
        }
      } else if (error.request) {
        console.log(error)
        Alert.alert('Network Error', 'No response received from the server.');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.wordText}>{item.word} - {item.englishMeaning}</Text>
      {item.word !== item.lemma || item.englishMeaning !== item.baseMeaning ? <Text style={styles.meaningText}>{item.lemma} - {item.baseMeaning}</Text> : <></>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search or type something..."
          textAlign="right" // Right-align the input text
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          onSubmitEditing={handleSearch} // Trigger search on "Enter" key
        />
        {inputValue.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="#888" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : wordList ? (
        <View style={styles.stepContainer}>
          <Text>{translation}</Text>
          <FlatList
            data={wordList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }} // Optional padding at the bottom
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
    paddingTop: 30,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  stepContainer: {
    flex: 1, // Make the step container fill available space
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    height: 40,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
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
  clearButton: {
    position: 'absolute',
    left: 15,
  },
});
