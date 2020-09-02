import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MedicalsCard from '../../../Components/MedicalsCard';
import { useLinkProps } from '@react-navigation/native';

const MedicalHistory = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View>
                <MedicalsCard
                onPress= {() => props.navigation.navigate('HistoryDetails')}
                date= "20 Jul, 2020 1:00am"
                section= "Virtual (General Practice)" 
                name= "Dr Jonathan Doe" />
                <MedicalsCard
                  onPress= {() => props.navigation.navigate('HistoryDetails')}
                date= "20 Jul, 2020 1:00am"
                section= "Virtual (General Practice)" 
                name= "Dr Jonathan Doe" />
                <MedicalsCard
                  onPress= {() => props.navigation.navigate('HistoryDetails')}
                date= "20 Jul, 2020 1:00am"
                section= "Virtual (General Practice)" 
                name= "Dr Jonathan Doe" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    }
});

export default MedicalHistory