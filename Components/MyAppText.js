import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const MyAppText = (props) => {
    return (
        <View>
            <Text onPress= {props.onPress} style= {{...styles.textStyle, ...props.style}}>
                {props.children}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'HammersmithOne-Regular',
        fontSize: 16
    }
})
export default MyAppText;