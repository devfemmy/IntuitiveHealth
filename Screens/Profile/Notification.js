import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import NotificationCard from '../../Components/NotificationCard';
import MyAppText from '../../Components/MyAppText';

const Notification = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <NotificationCard textDes = "Dr John Doe just confirmed your appointment. Kindly go check you appointment page to follow up.">
              <Image
               style= {{width: 20, height: 20, resizeMode: 'contain'}} 
               source= {require('../../assets/sliders/images/notification.png')} />
               <MyAppText style= {styles.textStyle}>26/12/2019 | 13:01 pm</MyAppText>
            </NotificationCard>
            <NotificationCard textDes = "Your appointment with Dr. John Doe has been cancelled, kindly re-schedule or make a new appointment">
              <Image
               style= {{width: 20, height: 20, resizeMode: 'contain'}} 
               source= {require('../../assets/sliders/images/notification.png')} />
               <MyAppText style= {styles.textStyle}>26/12/2019 | 13:01 pm</MyAppText>
            </NotificationCard>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 20
    },
    textStyle: {
        color: '#9B9B9B'
    },
    backText: {
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 17
    }
});

export default Notification;