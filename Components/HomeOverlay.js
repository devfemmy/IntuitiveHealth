import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../assets/sliders/images/homeicon.svg';
import InnerBtn from './InnerBtn';
import MyAppText from './MyAppText';

const HomeOverlay = (props) => {
    return (
        <View style= {styles.container}>
            <View style= {{alignItems: 'center'}}>
                <Icon width= {280} height= {150} />
            </View>
            <MyAppText style= {styles.textSyle}>
            Welcome Folashade,
            </MyAppText>
            <MyAppText style={styles.textSyle2}>
            this is your conduit to a healthier life
            </MyAppText>
            <View>
                <TouchableOpacity onPress= {props.pressed} style= {styles.btnContainer}>
                <MyAppText style= {{color: 'white'}}>Continue</MyAppText>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 300,
        width: '100%',
        // alignItems: 'center'
    },
    textSyle: {
        fontSize: 21,
        marginVertical: 10,
        textAlign: 'center',
        color: '#51087E'
    },
    textSyle2: {
       color: '#9B9B9B',
       marginHorizontal: 15
    },
    btnContainer: {
        width: '100%',
        backgroundColor: '#6C0BA9',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 25,
        marginVertical: 15,
        borderRadius: 5
    }
})

export default HomeOverlay;