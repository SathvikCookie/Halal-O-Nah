import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function AboutUs () {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>
                Halal-O-Nah is an app designed for Muslim people that allows users to see the ingredients in food products. 
                In recent times, due to food production processes, there are many unpredictable ingredients in food. 
                The app provides a simple solution to a typically overlooked problem.
                By allowing people to quickly check ingredient lists, Halal-O-Nah creates a way for people to stay within their religious boundaries and comfort levels.
                </Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomePage')}>
                <Text style= {styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    infoText: {
        fontSize: 20,
        padding: 12,
        margin: 20,
        marginTop: 40
    },
    buttonText: {
        fontSize: 20,
        padding: 12,
    },
    backButton: {
        borderRadius: 20,
        backgroundColor: "#aaa"
    }
});