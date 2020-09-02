import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import NurseImage from '../../../assets/sliders/images/nurse.svg';
import MyAppText from '../../../Components/MyAppText';
import InnerBtn from '../../../Components/InnerBtn';
const VitalsPage = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.widthContainer}>
                    <NurseImage width= {250} height= {250} />
                    <MyAppText style= {styles.textStyle}>
                        Lets get your Vitals
                    </MyAppText>
                    <MyAppText style= {styles.textStyle2}>
                    Your Vitals will let us know more about your health.
                    </MyAppText>
                    <View style= {styles.btnContainer}>
                        <InnerBtn onPress= {()=> props.navigation.navigate('Input')} bg= "#6C0BA9" color= "white" text= "Continue" />
                        <InnerBtn border= "#f7f7fa" color= "#6C0BA9" text= "Skip for later" />
                    </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    widthContainer: {
        alignItems: 'center',
        margin: 20
    },
    textStyle: {
        fontSize: 22,
        marginVertical: 20,
        color: '#6C0BA9'
    },
    textStyle2: {
        color: '#9B9B9B'
    },
    btnContainer: {
        width: '80%',
        marginVertical: 50

    }
});

export default VitalsPage