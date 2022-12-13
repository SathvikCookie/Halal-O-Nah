import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Check if given food is halal
const isHalal = food => {
  food = food.toLowerCase();

  if (halalFoods.includes(food)) {
    return true;
  }

  return 'not clear';
};

// Check if food is halal with the isHalal function, render screen based on the information
const handleCheckPress = input => {
  console.log('Checked');
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [input, setInput] = useState('');

  return (
    <View>
      {/* Text input to take in the user's input */}
      <TextInput
        value={input}
        onChangeText={text => setInput(text)}
        placeholder="Enter a food product"
      />

      {/* Button to check if the input is halal or not */}
      <Button onPress={handleCheckPress} title="Check" />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
