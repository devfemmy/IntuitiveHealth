import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '../assets/sliders/images/report_problem.svg';
import MyAppText from './MyAppText';

const ChatOverlay = (props) => {
    return (
        <View style= {styles.container}>
            <Icon width= {80} height= {100} />
            <MyAppText style= {styles.textSyle}>
               {props.message}
            </MyAppText>
            <MyAppText onPress= {props.onPress} style= {styles.textSyle2}>
               Cancel
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
        marginHorizontal: 50,
        marginVertical: 5
    },
    textSyle2: {
        opacity: 0.5,
        textAlign: 'center'
    }
})

export default ChatOverlay;