import React from 'react';
import { View, StyleSheet,Text, TouchableOpacity } from 'react-native';
import MyAppText from './MyAppText';

const InnerBtn = (props) => {
    const styles = StyleSheet.create({
        btnStyle: {
            width: '100%',
            backgroundColor: props.bg,
            color: props.color,
            fontWeight: 'bold',
            fontSize: 35,
            height: 50,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20
        },
        textStyle: {
            color: props.color,
            fontWeight: 'bold',
            fontSize: 15,
            fontFamily: 'HammersmithOne-Regular',
        },
        iconStyle: {
            marginLeft: 4,
            marginTop: 4
        }
    });
    return (
        <View>
            <TouchableOpacity onPress= {props.onPress} style= {styles.btnStyle}>
                <MyAppText>
                <MyAppText style= {styles.textStyle}>{props.text}
                </MyAppText> 
                <MyAppText style= {styles.iconStyle}>
                {props.icon}
                </MyAppText>
                </MyAppText>
            </TouchableOpacity>
        </View>
    )
}


export default InnerBtn;