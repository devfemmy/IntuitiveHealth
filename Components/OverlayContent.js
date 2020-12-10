import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '../assets/sliders/images/success.svg';
import MyAppText from './MyAppText';

const OverLayContent = () => {
    return (
        <View style= {styles.container}>
            <Icon width= {300} height= {250} />
            <MyAppText style= {styles.textSyle}>
                Successful
            </MyAppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 300,
        width: '100%'
    },
    textSyle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#51087E'
    }
})

export default OverLayContent;