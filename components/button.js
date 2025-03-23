import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({labelButton,onPress}) =>{
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>
                {labelButton}
            </Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#ddd",
        width:350,
        height:45,
        justifyContent: "center",
        alignItems:"center",

    }
})