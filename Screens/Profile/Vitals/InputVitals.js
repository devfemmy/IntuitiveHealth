import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import VitalInput from '../../../Components/VitalInput';
import InnerBtn from '../../../Components/InnerBtn';

const InputVitals = () => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.vitalContainer}>
                <VitalInput
                keyboardType= "numeric"
                color= "#D30C0C" 
                indicator= "High" label= "Pulse Rate" />
                <VitalInput
                keyboardType= "numeric"
                color= "#E6C300" 
                indicator= "Low" label= "Respiratory Rate" />
                <VitalInput
                keyboardType= "numeric"
                color= "#58C315" 
                indicator= "Normal" label= "Blood Pressure" />
                <VitalInput
                keyboardType= "numeric"
                color= "#D30C0C" 
                indicator= "High" label= "Temperature" />
                <View style= {styles.btnContainer}>
                        <InnerBtn 
                        bg= "#6C0BA9"
                        color= "white"
                        text= "Save" />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    vitalContainer: {
        margin: 20
    },
    btnContainer: {
        marginTop: 30
    }
});

export default InputVitals;