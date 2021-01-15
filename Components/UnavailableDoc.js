import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '../assets/sliders/images/warningpx.svg';
import MyAppText from './MyAppText';

const UnavailableDoctor = (props) => {
    return (
        <View style= {styles.container}>
            <Icon width= {80} height= {100} />
            <MyAppText style= {styles.textSyle}>
                {props.message}
            </MyAppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 300,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        
    
    },
    textSyle: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        marginHorizontal: 70,
        marginVertical: 15
    }
})

export default UnavailableDoctor;