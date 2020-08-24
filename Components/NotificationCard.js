import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MyAppText from './MyAppText';

const NotificationCard = (props) => {
    return (
        <View style= {styles.container}>
            <View style= {styles.flexContainer}>
                {props.children}
            </View>
            <MyAppText style= {styles.textStyle}>
                {props.textDes}
            </MyAppText>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        marginBottom: 15,
        backgroundColor: 'white',
        minHeight: 50,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        // shadowColor: "black",
        // shadowOffset: {
        //     width: 3,
        //     height: 3,
        // },
        // shadowOpacity: 0.15,
        // shadowRadius: 3.84,

        // elevation: 5,
        borderRadius: 5
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      
    },
    textStyle: {
        marginVertical: 15
    }
    
});

export default NotificationCard