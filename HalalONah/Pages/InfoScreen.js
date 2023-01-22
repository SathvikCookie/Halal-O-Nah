import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, setDoc, doc}  from "firebase/firestore";

export default function InfoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const scanData = route.params.scanData;

    const [exists, setExists] = useState(true);
    const [isHalal, setIsHalal] = useState(false);
    const [productDescription, setproductDescription] = useState();

    const firebaseConfig = {
      apiKey: "AIzaSyDaIqNTYHN2S4bJaA4VC7U088u9k59hGxY",
      authDomain: "halal-o-nah.firebaseapp.com",
      projectId: "halal-o-nah",
      storageBucket: "halal-o-nah.appspot.com",
      messagingSenderId: "346110751753",
      appId: "1:346110751753:web:9deeb91874978c8f64f4d8",
      measurementId: "G-VD207B9KR1"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore();

    async function getData() {
      const docRef = doc(db, 'products', scanData);
      
      try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setIsHalal(Boolean(docSnap.get("isHalal")))
            setExists(true);
        } else {
            setExists(false);
        }
    
      } catch(error) {
        console.log(error)
      }
    }

    async function setData(isHalal) {
      const docRef = doc(db, "products", scanData);

      const data = {
        isHalal: isHalal,
      };

      setDoc(docRef, data).then(() => {
        console.log("Document has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })
    }

  useEffect(() => {
      getData();
    }
  );

  console.log(isHalal)

  if (!exists) {
    return (
      <View>
        <Text>We can't find your product, please add it so we can grow our database</Text>
        <Switch 
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isHalal ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsHalal(!isHalal)}
          value={isHalal}
        />
        <Button title='Add to database' onPress={() => setData(isHalal)}/>
      </View>
    )
  }

  return (
      <View style={styles.container}>
        <Text>{isHalal ? "Your product is Halal!" : "Your product is not Halal!"}</Text>
      </View>
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
