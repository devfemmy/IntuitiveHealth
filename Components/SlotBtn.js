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
        }
    });
    return (
        <View style= {styles.container}>
            <TouchableOpacity style= {styles.btnContainer}>
                <MyAppText style= {props.style1}>{props.date}</MyAppText>
                <MyAppText  style= {props.style2}>
                    {props.name}
                </MyAppText>
            </TouchableOpacity>
        </View>
    )
}



export default SlotBtn