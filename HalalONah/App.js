import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

// Import the list of halal foods
import halalFoods from "./halalFoods.json";

function App() {
  // State variable to store the user's input
  const [input, setInput] = useState("");

  // Function to check if a food product is halal or not
  function isHalal(food) {
    // Convert the food product to lower case for case-insensitive matching
    food = food.toLowerCase();

    // Check if the food product is in the halal foods list
    if (halalFoods.includes(food)) {
      return true;
    }

    // If the food product is not in the list, it is not clear whether it is halal or not
    return "not clear";
  }

  // Function to handle the "Check" button press
  function handleCheckPress() {
    // Call the isHalal function to check if the input is halal or not
    const result = isHalal(input);

    // Display the result on the screen
    if (result === true) {
      return (
        <View>
          <Text>The food product is halal.</Text>
        </View>
      );
    } else if (result === false) {
      return (
        <View>
          <Text>The food product is not halal.</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>It is not clear whether the food product is halal or not.</Text>
        </View>
      );
    }
  }

  return (
    <View>
      {/* Text input to take in the user's input */}
      <TextInput
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder="Enter a food product"
      />

      {/* Button to check if the input is halal or not */}
      <Button onPress={handleCheckPress} title="Check" />
    </View>
  );
}

export default App;