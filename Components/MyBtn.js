import React from 'react';
import { View, StyleSheet,Text, TouchableOpacity } from 'react-native';
import MyAppText from './MyAppText';

const MyBtn = (props) => {
    return (
        <View>
            <TouchableOpacity onPress= {props.onPress} style= {styles.btnStyle}>
                <MyAppText style= {styles.textStyle}>{props.btnText}</MyAppText>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    btnStyle: {
        width: '100%',
        backgroundColor: '#51087E',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    textStyle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default MyBtn;