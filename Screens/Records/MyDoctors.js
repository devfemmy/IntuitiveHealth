import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MyDoctorsCard from '../../Components/MyDoctorsCard';

const MyDoctors = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View>
                <MyDoctorsCard
                pressed= {()=> props.navigation.navigate('Consult')}
                language= "English, Yoruba, Hausa"
                section= "Obstetricians/Gynecologists" 
                name= "Dr. Jonathan Emmanuel" />
                <MyDoctorsCard
                language= "English, Yoruba, Hausa"
                section= "Obstetricians/Gynecologists" 
                name= "Dr. Jonathan Emmanuel" />
                <MyDoctorsCard
                language= "English, Yoruba, Hausa"
                section= "Obstetricians/Gynecologists" 
                name= "Dr. Jonathan Emmanuel" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    }
});

export default MyDoctors