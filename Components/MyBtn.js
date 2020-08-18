import React from 'react';
import { View, StyleSheet,Text, TouchableOpacity } from 'react-native';

const MyBtn = (props) => {
    return (
        <View>
            <TouchableOpacity onPress= {props.onPress} style= {styles.btnStyle}>
                <Text style= {styles.textStyle}>{props.btnText}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    btnStyle: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#51087E',
        fontWeight: 'bold',
        fontSize: 35,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    textStyle: {
        color: '#51087E',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default MyBtn;