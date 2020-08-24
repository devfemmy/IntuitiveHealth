import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MyAppText from '../../Components/MyAppText';
import AppointmentCard from '../../Components/AppointmentCard';
import InnerBtn from '../../Components/InnerBtn';

const AppointmentPage = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.cardContainer}>
                <AppointmentCard color= "#464646" status= "Processing" appid= {236578} />
                <AppointmentCard color= "#FC7E00" status= "Scheduled" appid= {236578} />
                <AppointmentCard color= "#58C315" status= "Completed" appid= {236578} />
                <AppointmentCard color= "#58C315" status= "Completed" appid= {236578} />
                <AppointmentCard color= "#D30C0C" status= "Cancelled" appid= {236578} />
                <View style= {styles.btnContainer}>
                    <InnerBtn onPress= {() => props.navigation.navigate('Details')} color= "white" bg= "#51087E" text= "Start a new conversation" />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1
    },
    cardContainer: {
        margin: 20
    }
});

export default AppointmentPage