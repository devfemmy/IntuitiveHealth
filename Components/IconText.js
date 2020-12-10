import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MyAppText from './MyAppText';

const IconText = (props) => {
    const styles = StyleSheet.create({
        container : {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 2,
            width: props.width,
        },
        textColor: {
            color: props.color,
            paddingBottom: props.paddingBottom,
            fontSize: props.size
        }
    });
    return (
        <View style= {styles.container}>
            <Text>
                {props.icon}
            </Text>
            <MyAppText style= {styles.textColor}>
                {props.text} <MyAppText>{props.slot}</MyAppText>
            </MyAppText>
        </View>
    )
}



export default IconText;