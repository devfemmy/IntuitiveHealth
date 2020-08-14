import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import NotificationCard from '../../Components/NotificationCard';

const Notification = () => {
    return (
        <ScrollView style= {styles.container}>
            <NotificationCard textDes = "Dr John Doe just confirmed your appointment. Kindly go check you appointment page to follow up.">
              <Image
               style= {{width: 20, height: 20, resizeMode: 'contain'}} 
               source= {require('../../assets/sliders/images/notification.png')} />
               <Text style= {styles.textStyle}>26/12/2019 | 13:01 pm</Text>
            </NotificationCard>
            <NotificationCard textDes = "Your appointment with Dr. John Doe has been cancelled, kindly re-schedule or make a new appointment">
              <Image
               style= {{width: 20, height: 20, resizeMode: 'contain'}} 
               source= {require('../../assets/sliders/images/notification.png')} />
               <Text style= {styles.textStyle}>26/12/2019 | 13:01 pm</Text>
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
    }
});

export default Notification;