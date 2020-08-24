import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DoctorCard from '../../Components/DoctorCard';
import MyAppText from '../../Components/MyAppText';
import InnerBtn from '../../Components/InnerBtn';
import PhoneIcon from '../../assets/sliders/images/phone.svg';
import ChatIcon from '../../assets/sliders/images/vc.svg';
const AppointmentDetails = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.doctorContainer}>
            <DoctorCard 
                image= {require('../../assets/sliders/images/doctor.png')}
                college= "Obstetricians/Gynecologists"
                name= "Dr. Jonathan Emmanuel" 
                experience= "23 years experience overall" />
                <View style= {styles.activeFlag}>
                </View>
            </View>
            <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>
                    Purpose of Booking
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
                Video Consultation (Obstetricians And Gynaecologists?
                </MyAppText>
            </View>
            <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>
                   Date and Time
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
                20 Jul, 1:00am
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
               Active Now
                </MyAppText>
            </View>
            <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>
                    Booked For
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
                John Doe
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
               09033333333
                </MyAppText>
            </View>
            <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>
                    Patient ID
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
                MRPP00000001
                </MyAppText>
            </View>
            <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>
                    Visit ID
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
                INTE30
                </MyAppText>
            </View>
            <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>
                    Status
                </MyAppText>
                <MyAppText style= {styles.textStyle1}>
                    Active
                </MyAppText>
            </View>
            <View style= {styles.btnContainer}>
                    <View style= {styles.callContainer}>
                    <InnerBtn
                    onPress= {()=> props.navigation.navigate('Voice')} 
                    bg= "#880ED4" color= "white" icon= {<PhoneIcon width= {18} height= {18} />} text= "Voice Call" />
                    </View>
                  
                    <View style= {styles.callContainer}>
                    <InnerBtn
                     onPress= {()=> props.navigation.navigate('Virtual')}  
                    bg= "#51087E" color= "white" icon= {<ChatIcon width= {18} height= {18} />} text= "Virtual Call" />
                    </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    doctorContainer: {
        margin: 20,
        position: 'relative'
    },
    label: {
        color: '#BBC2CC',
        fontSize: 15
    },
    activeFlag: {
        top: -45,
        left: 50,
        backgroundColor: '#58C315',
        height: 18,
        width: 18,
        borderRadius: 10
    },
    bookingPurpose: {
        borderTopWidth: 1,
        borderTopColor: '#E6EAF0',
        padding: 20,
        paddingVertical: 15
    },
    textStyle: {
        color: '#2E2E2E'
    },
    textStyle1: {
        color: '#58C315'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    callContainer: {
        width: '45%'
    }
});

export default AppointmentDetails