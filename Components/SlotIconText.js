import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MyAppText from './MyAppText';

const SlotIconText = (props) => {
    const styles = StyleSheet.create({
        container : {
            // display: 'flex',
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            // marginTop: 2,
            // width: props.width,
        },
        textColor: {
            color: props.color,
            paddingBottom: props.paddingBottom,
            fontSize: props.size
        },
        textColor2: {
            color: props.textColor
        },
        textStyle: {
            marginHorizontal: 10,
            color: props.color,
            fontSize: props.size
        }
    });
    return (
        <View style= {styles.container}>
            <Text>
                {props.icon}
                <MyAppText style= {styles.textStyle}>
                {props.text}</MyAppText> 
                <MyAppText style= {styles.textColor2}>{props.slot}</MyAppText>
 
            </Text>
        </View>
    )
}



export default SlotIconText;