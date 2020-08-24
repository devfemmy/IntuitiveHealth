import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MyAppText from '../../../Components/MyAppText';
import DoctorCard from '../../../Components/DoctorCard';
import ProfileInput from '../../../Components/ProfileInput';
import InnerBtn from '../../../Components/InnerBtn';
import OverLayContent from '../../../Components/OverlayContent';

const PatientDetails = () => {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setVisible(!visible);
    };
    return (
        <ScrollView style= {styles.container}>
          <View style= {styles.doctor}>
          <DoctorCard 
                image= {require('../../../assets/sliders/images/doctor.png')}
                college= "Primary care"
                name= "Dr. Jonathan Emmanuel" 
                experience= "23 years experience overall" />
          </View>
          <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>Purpose of Booking</MyAppText>
                <MyAppText style= {styles.textStyle}>Virtual Consultation (Primary Care)</MyAppText>
          </View>
          <View style= {styles.dateContainer}>
          <MyAppText style= {styles.label}>Purpose of Booking</MyAppText>
                <MyAppText style= {styles.textStyle}>Virtual Consultation (Primary Care)</MyAppText>
          </View>
          <View style= {styles.lowerContainer}>
          <MyAppText style= {styles.textStyle2}>Please provide your information below:</MyAppText>
          <ProfileInput defaultValue= "John Doe" label= "Full name" keyboardType= "default" />
          <ProfileInput defaultValue= "0903333333" label= "Phone Number" keyboardType= "phone-pad" />
          </View>
          <View style= {styles.noteContainer}>
                <MyAppText style= {styles.noteText}>Note:</MyAppText>
                <MyAppText style= {styles.noteText}>
                    1. Update will be sent to johndoe4life@gmail.com
                </MyAppText>
                <MyAppText>
                    <MyAppText style= {styles.noteText}>
                    2. By booking the appointment, you agree to Conduit telehealth’s 
                    <MyAppText style= {styles.textColor}> Terms and conditions.</MyAppText>

                    </MyAppText>
                </MyAppText>

          </View>
          <View style= {styles.btnContainer}>
                <InnerBtn onPress={toggleOverlay} color= "white" bg= "#51087E" text= "Confirm" />
          </View>
          <View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <OverLayContent />
            </Overlay>
          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
      
    },
    doctor : {
        padding: 15
    },
    label: {
        color: '#BBC2CC',
        fontSize: 13
    },
    textStyle: {
        color: '#2E2E2E'
    },
    textStyle2: {
        textAlign: 'center'
    },
    bookingPurpose: {
        borderBottomColor: '#E6EAF0',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: '#E6EAF0',
        padding: 10,
        paddingHorizontal: 15,
    },
    lowerContainer: {
        borderBottomColor: '#E6EAF0',
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderTopColor: '#E6EAF0',
        marginVertical: 10,
        padding: 20,
        minHeight: 220,
        paddingHorizontal: 15
    },
    dateContainer: {
        padding: 15
    },
    noteContainer: {
        minHeight: 150,
        padding: 15,
        borderBottomColor: '#E6EAF0',
        borderBottomWidth: 3,
    },
    noteText: {
        color: '#9B9B9B',
        lineHeight: 22,
        marginVertical: 2
    },
    textColor: {
        color: '#6C0BA9'
    },
    btnContainer: {
        backgroundColor: 'white',
        minHeight: 150,
        padding: 15
    }
});

export default PatientDetails