/*
Sathvik Kanuri, Matthew Hrmich, Bilal Ali, Avni Doshi
6/7/2023

The HomePage for the app, where all teh scanning goes on. Moves to InfoScreen when a barcode is scanned
*/

import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function HomePage() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();

  // Runs everytime this screen is loaded, resets scan data , makes sure we have camera permissions
  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setScanData(undefined);
    })();
  }, []);



  // If we don't have permission to use the camera, display a screen to request user to enable them
  if (!hasPermission) {
    return (
      <View>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    )
  }

  // When the barcode is scanned, get our scan data, and navigate to the info screen
  const handleBarCodeScanned = ({type, data}) => {
    setScanData(data);
    navigation.navigate('InfoScreen', {scanData: data});
  }

  // What is displayed on the screen when scannning, uses barcode scanner from expo-barcode-scanner
  return (
      <View style={styles.container}>
        <Text style={styles.scanText}>Please scan your item:</Text>
        <BarCodeScanner
          style={styles.scanner}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
          />
          {scanData && <Button title='Scan Again?' onPress={() => setScanData(undefined)} />}
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('AboutUs')}>
          <Text style={styles.buttonText}>About Us</Text>
        </TouchableOpacity>
      </View>
  );
}

// Styling for the homepage
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scanText: {
    marginHorizontal: '10%',
    marginTop: 70,
    marginBottom: 30,
    fontSize: 30
  },
  scanner: {
    width: '85%',
    height: '60%'
  },
  backButton: {
    borderRadius: 20,
    marginTop: 45,
    backgroundColor: "#aaa"
  },
  buttonText: {
    fontSize: 20,
    padding: 12
  }
});
