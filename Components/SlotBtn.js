import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MyAppText from './MyAppText';

const SlotBtn = (props) => {
    const styles = StyleSheet.create({
        container: {
    
        },
        btnContainer: {
            borderColor: props.border,
            borderWidth: 1,
            minWidth: 150,
            minHeight: 60,
            marginRight: 10,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center'
        },
        dateStyle: {
            // backgroundColor: 'red',
            marginHorizontal: 10
        },
        slotStyle: {
            color: '#51087E'
        }
    });
    return (
        <View style= {styles.container}>
            <TouchableOpacity onPress= {props.onPress} style= {styles.btnContainer}>
                <MyAppText style= {styles.dateStyle}>{props.date}</MyAppText>
                <MyAppText  style= {styles.slotStyle}>
                    {props.name}
                </MyAppText>
            </TouchableOpacity>
        </View>
    )
}



export default SlotBtn