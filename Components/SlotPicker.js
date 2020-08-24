import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MyAppText from './MyAppText';

const SlotPicker = (props) => {
    const styles = StyleSheet.create({
        container: {
    
        },
        btnContainer: {
            borderColor: props.border,
            backgroundColor: props.bg,
            borderWidth: 1,
            width: 78,
            // minWidth: 150,
            minHeight: 45,
            marginRight: 13,
            borderRadius: 7,
            marginVertical: 8,
            alignItems: 'center',
            justifyContent: 'center'
        },
        slotStyle: {
            color: props.color
        }
    });
    return (
        <View style= {styles.container}>
            <TouchableOpacity onPress= {props.onPress} style= {styles.btnContainer}>
                <MyAppText style= {styles.slotStyle}>
                    {props.time}
                </MyAppText>
            </TouchableOpacity>
        </View>
    )
}



export default SlotPicker;