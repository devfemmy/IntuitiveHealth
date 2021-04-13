import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { Picker, Form } from 'native-base'
import { View, StyleSheet,AsyncStorage,ActivityIndicator, ScrollView, Text, Alert } from 'react-native';
import MyAppText from '../../../Components/MyAppText';
import DoctorCard from '../../../Components/DoctorCard';
import ProfileInput from '../../../Components/ProfileInput';
import InnerBtn from '../../../Components/InnerBtn';
import OverLayContent from '../../../Components/OverlayContent';
import axios from '../../../axios-req';
import errorHandler from '../../ErrorHandler/errorHandler';



const PatientDetails = (props) => {
    const [visible, setVisible] = useState(false);
    const { title, name, last_name, image, slots, group_id} = props.route.params;
    const [showBtn, setShowBtn] = useState(true);
    const [email, setEmail] = useState('')
    const [id_slot, setSlot] = useState('');
    const [error, setError] = useState(false);
    // const [gender, setGender] = useState('');
    const [selected, setSelected] = useState('');
    

    const id = AsyncStorage.getItem('email').then(
        res => {
            setEmail(res)
        }
    ).catch(
        err => {}
    );

    const slot_id = AsyncStorage.getItem('formid').then(
        res => {
            // console.log('222', res)
            setSlot(res)
        }
    ).catch(
        err => {}
    )

    const appDay = slots.app_date;
    const appDayName= slots.app_day_name;
    const displayDate = `${appDayName}, ${appDay}`;

    function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }
    const appTime = tConvert(slots.app_time.slice(0,5));

    const toggleOverlay = () => {
      setVisible(true);
    };
    const onValueChange =(value) => {
        setSelected(value)
      }
    
    const confirmAppointment = () => {
        if (selected === '') {
            alert('Please select channel for appointment')
        }else {
            setShowBtn(false)
            const doctor_id = slots.doctor_id;
            const slot_id = slots.id;
            if (group_id === 1) {
                const id = AsyncStorage.getItem('Mytoken').then(
                    res => {
                        const data = {
                            slot_id: slot_id,
                            doctor_id:  doctor_id,
                            channel_id: selected
                          
                        }
                        axios.post('user/book/slot', data, {headers: {Authorization: res}})
                        .then(
                            res => {  
                                const message = res.data.message; 
                               toggleOverlay()
                                setShowBtn(true)
                            }
                        )
                        .catch(err => {
    //(err.response);
                            setError(true);
                            setShowBtn(true)
             
                        })
                    }
                )
                .catch( err => {console.log(err)})
            }else {
                const id = AsyncStorage.getItem('Mytoken').then(
                    res => {
                        const data = {
                            slot_id: slot_id,
                            doctor_id:  doctor_id,
                            channel_id: selected,
                            intake_id: parseInt(id_slot)
                          
                        }
                        axios.post('user/book/group/slot', data, {headers: {Authorization: res}})
                        .then(
                            res => {  
                                const message = res.data.message; 
                               toggleOverlay()
                                setShowBtn(true)
                            }
                        )
                        .catch(err => {
                            setError(true);
                            setShowBtn(true)         
                        })
                    }
                )
                .catch( err => {console.log(err)})
            }
        }


    }
    const moveToHome = () => {
        setVisible(false)
        props.navigation.popToTop()
    }
    return (
        <ScrollView style= {styles.container}>
          <View style= {styles.doctor}>
          <DoctorCard 
                image= {{uri: image}}
                name= {`${title} ${name} ${last_name}`} />
          </View>
          <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>Date of Booking</MyAppText>
                <MyAppText onPress= {() => props.navigation.goBack()}  style= {styles.textStyle}>
                        {displayDate}
                </MyAppText>
          </View>
          <View style= {styles.dateContainer}>
          <MyAppText style= {styles.label}>Appointment Time</MyAppText>
                <MyAppText onPress= {() => props.navigation.goBack()} style= {styles.textStyle}>
                    {appTime}
                </MyAppText>
          </View>
          <View style= {styles.lowerContainer}>
          <View>
                <MyAppText style= {styles.noteText}>Note:</MyAppText>
                <MyAppText style= {styles.noteText}>
                    1. Update will be sent to {email}
                </MyAppText>
                    <MyAppText style= {styles.noteText}>
                    2. By booking the appointment, you agree to Conduit telehealth’s Terms and conditions.
                  </MyAppText>
                  <View style = {styles.seperator}>
                    <Form>
                        <Picker
                        mode="dropdown"
                        // iosIcon={<Icon name="arrow-down" />}
                        placeholder="Select Channel"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        style={{ width: undefined }}
                        selectedValue={selected}
                        onValueChange={onValueChange}
                        >
                        <Picker.Item label="Select Channel" value="" />
                        <Picker.Item label="Video" value="1" />
                        <Picker.Item label="Voice" value="2" />
                        <Picker.Item label="Chat" value="3" />
                        </Picker>
                    </Form>
                  </View>


          </View>
          </View>
          <View style= {styles.btnContainer}>
          {showBtn ?   <InnerBtn onPress={confirmAppointment} color= "white" bg= "#51087E" text= "Confirm" /> 
          : <ActivityIndicator size= "large" color= "#000075"/>}
               
          </View>
          <View>
            <Overlay isVisible={visible} onBackdropPress={moveToHome}>
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
        borderBottomWidth: 2,
        width: '100%',
        // alignItems: 'flex-start',
        overflow: 'visible',
    },
    seperator: {
        borderTopColor: '#E6EAF0',
        borderTopWidth: 1,
        marginTop: 10
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
        minHeight: 150,
        padding: 15
    }
});

export default errorHandler(PatientDetails, axios)