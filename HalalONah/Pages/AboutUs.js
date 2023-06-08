import React from "react";
import { View, TouchableOpacity } from "react-native/types";
import { StyleSheet } from "react-native/types";
import { useNavigation } from "@react-navigation/native";

export default function AboutUs () {
    const navigation = useNavigation();

    return (
        <View>
            <Text style={styles.infoText}></Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomePage')}>
                <Text style= {styles.infoText}>Go Back</Text>
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
        marginTop: 30,
        fontSize: 30,
        padding: 12
    },
    backButton: {
        borderRadius: 20,
    }
});