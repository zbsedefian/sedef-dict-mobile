import { Image, StyleSheet, Platform, ActivityIndicator, TextInput, StatusBar, TouchableOpacity, Text, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import axios from 'axios';

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null); // State to store the fetched data
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      Alert.alert('Error', 'Please enter a search term.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.4.30:8000/lookup",
        { word: inputValue }
      );
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ThemedView style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Search or type something..."
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            onSubmitEditing={handleSearch} // Trigger search on "Enter" key
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
        </ThemedView>

        {loading ? (
          <ThemedView style={styles.center}>
            <ActivityIndicator size="large" color="#0000ff" />
          </ThemedView>
        ) : data ? (
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">{data.word}</ThemedText>
            <ThemedText>{data.english_meaning} </ThemedText>
            <ThemedText>{data.attributes.verb.tense} {data.attributes.verb.mood}</ThemedText>
            <ThemedText>Form {data.attributes.verb.verb_form ?? 'I'}</ThemedText>
            <ThemedText>
              {data.attributes.verb.related_forms.past} | {data.attributes.verb.related_forms.present} | {data.attributes.verb.related_forms.masdar}
            </ThemedText>
            <ThemedText>{data.base_meaning} {data.pos}</ThemedText>
            <ThemedText>{data.attributes.verb.tense} {data.attributes.verb.mood}</ThemedText>
            <ThemedText>Subject: {data.attributes.verb.declined_subject}</ThemedText>
          </ThemedView>
        ) : null}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  inputBar: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  button: {
    height: 40,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
