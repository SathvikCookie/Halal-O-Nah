import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();

  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setScanData(undefined);
    })();
  }, []);



  if (!hasPermission) {
    return (
      <View>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    )
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanData(data);
    navigation.navigate('InfoScreen', {scanData: data});
  }

  return (
      <View style={styles.container}>
        <Text style={styles.scanText}>Please scan your item:</Text>
        <BarCodeScanner
          style={styles.scanner}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
          />
          {scanData && <Button title='Scan Again?' onPress={() => setScanData(undefined)} />}
        <StatusBar style="auto" />
      </View>
  );
}

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
  }
});
