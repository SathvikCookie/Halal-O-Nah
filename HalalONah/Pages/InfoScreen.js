import { StatusBar } from "expo-status-bar";
import { Button, Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
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
    const [productName, setProductName] = useState("What is the product name?");

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
            setProductName(String(docSnap.get("productName")))
            setExists(true);
        } else {
            setExists(false);
        }
    
      } catch(error) {
        console.log(error)
      }
    }

    async function setData(isHalal, productName) {
      const docRef = doc(db, "products", scanData);

      const data = {
        isHalal: isHalal,
        productName: productName
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
      <View style={styles.container}>
        <Text style={styles.notFoundText}>We can't find your product. Please add it so we can grow our database</Text>
        <Text style={styles.isHalalText}>Is your product halal?</Text>
        <Switch 
          trackColor={{false: '#767577', true: '#00A334'}}
          thumbColor={isHalal ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsHalal(!isHalal)}
          value={isHalal}
          style={styles.halalSwitch}
        />
        <TextInput 
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={text => setProductName(text)}
          value={productName}
          defaultValue={"What is the product name?"}
          style={styles.textInput}
        />
        <Pressable style={styles.addButton} onPress={() => {setData(isHalal, productName); navigation.push('HomePage')}}>
          <Text style={styles.addText}>Add to Database</Text>
        </Pressable>
      </View>
    )
  }

  return (
      <View style={styles.container}>
        <View style={isHalal ? styles.halalIconContainer : styles.notHalalIconContainer}>
          <Feather name={isHalal ? "check" : "x"} style={styles.icon} size={200}/>
        </View>
        <Text style={styles.halalText}>{isHalal ? "Your product is Halal!" : "Your product is not Halal!"}</Text>
        <Pressable 
          style={styles.backButton} 
          onPress={() => navigation.push('HomePage')}
        >
          <Text style={styles.backButtonText}>Scan Another Item</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  halalIconContainer: {
    backgroundColor: "#00A334",
    width: 250,
    height: 250,
    borderRadius: 500,
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notHalalIconContainer: {
    backgroundColor: "#B90000",
    width: 250,
    height: 250,
    borderRadius: 500,
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: '#fff',
  },
  halalText: {
    marginTop: 30,
    fontSize: 30,
  },
  backButton: {
    backgroundColor: "#00A334",
    marginTop: 30,
    width: '50%',
    height: 30,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center"
  },
  backButtonText: {
    fontSize: 15,
    color: '#fff'
  },
  notFoundText: {
    marginTop: 70,
    fontSize: 30,
    marginHorizontal: '15%',
    textAlign: 'center'
  },
  isHalalText: {
    marginTop: 20,
    fontSize: 30,
    marginHorizontal: '15%',
    textAlign: 'center'
  },
  halalSwitch: {
    marginTop: 20
  },
  addButton: {
    backgroundColor: "#00A334",
    marginTop: 30,
    width: '50%',
    height: 50,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center"
  },
  addText: {
    fontSize: 22
  },
  textInput: {
    marginTop: 20,

  }
});
