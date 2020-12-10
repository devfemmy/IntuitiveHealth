import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MyAppText from './MyAppText';

const DoctorCard = (props) => {
    return (
        <View>
            <View style= {styles.container}>
            <Image style= {styles.imageStyle} source= {props.image} />
            <View style= {styles.flexCont}>
                <MyAppText style= {styles.textColor}>{props.name}</MyAppText>
                <MyAppText style= {styles.color}>
                    {props.college}
                </MyAppText>
                <MyAppText style= {styles.color}>
                    {props.experience}
                </MyAppText>
            </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        minHeight: 90,
        shadowColor: "#1F1F1F1F",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 5,
    },
    flexCont: {
        paddingTop: 10
    },
    textColor: {
        fontWeight: 'bold',
        fontFamily: 'HammersmithOne-Regular',
        fontSize: 16
    },
    color: {
        color: '#9B9B9B',
        fontFamily: 'HammersmithOne-Regular',
    },
    imageStyle: {
        height: 70,
        width: 70,
        borderRadius: 60,
        resizeMode: 'cover'
    }
});

export default DoctorCard;