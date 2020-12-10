import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MyAppText from './MyAppText';

const ProfileCard = (props) => {
    return (
        <View style= {styles.container}>
            {/* <MyAppText>{props.second}</MyAppText> */}
            <View style= {styles.flexContainer}>
                {props.children}
            </View>
            {/* <Text style= {styles.textStyle}>
                {props.textDes}
            </Text> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        marginBottom: 15,
        backgroundColor: 'white',
        minHeight: 54,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 5,
        shadowColor: "#1F1F1F1F",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 5,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
      
    },
    textStyle: {
        marginVertical: 15
    }
    
});

export default ProfileCard;