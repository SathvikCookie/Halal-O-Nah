import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./Pages/HomePage";
import InfoScreen from "./Pages/InfoScreen";
import AboutUs from "./Pages/AboutUs";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="HomePage" component={HomePage} />
          <Stack.Screen options={{headerShown: false}} name="InfoScreen" component={InfoScreen} />
          <Stack.Screen options={{headerShown: false}} name="AboutUs" component={AboutUs} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
