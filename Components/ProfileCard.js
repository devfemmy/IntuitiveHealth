import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ProfileCard = (props) => {
    return (
        <View style= {styles.container}>
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
        borderRadius: 5
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