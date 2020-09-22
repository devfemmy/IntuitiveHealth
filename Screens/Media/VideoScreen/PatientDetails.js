import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View, StyleSheet,AsyncStorage,ActivityIndicator, ScrollView, Text, Alert } from 'react-native';
import MyAppText from '../../../Components/MyAppText';
import DoctorCard from '../../../Components/DoctorCard';
import ProfileInput from '../../../Components/ProfileInput';
import InnerBtn from '../../../Components/InnerBtn';
import OverLayContent from '../../../Components/OverlayContent';
import axios from 'axios';

const PatientDetails = (props) => {
    const [visible, setVisible] = useState(false);
    const { title, name, last_name, image, slots, group_id} = props.route.params;
    const [showBtn, setShowBtn] = useState(true);
    const [email, setEmail] = useState('')
    const id = AsyncStorage.getItem('email').then(
        res => {
            setEmail(res)
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
    const confirmAppointment = () => {
        setShowBtn(false)
        console.log('slot', slots)
        const doctor_id = slots.doctor_id;
        const slot_id = slots.id;
        console.log(doctor_id, typeof(doctor_id))
        if (group_id === 1) {
            const id = AsyncStorage.getItem('Mytoken').then(
                res => {
                    const data = {
                        slot_id: slot_id,
                        doctor_id:  doctor_id
                      
                    }
                    axios.post('https://conduit.detechnovate.net/public/api/user/book/slot', data, {headers: {Authorization: res}})
                    .then(
                        res => {  
                           console.log(res)
                            const message = res.data.message; 
                           toggleOverlay()
                            setShowBtn(true)
                        }
                    )
                    .catch(err => {
                        console.log(err.response)
                        const code = err.response.status;
                        const message = err.response.message
                        if (code === 400) {
                            setShowBtn(true)
                            Alert.alert(
                                message,
                                'Please Try Another',
                                [
                                  {text: 'OK', onPress: () => setShowBtn(true)},
                                ],
                                { cancelable: false }
                              )
                        }
                        else if (code === 401) {
                            Alert.alert(
                                'Error!',
                                'Expired Token',
                                [
                                  {text: 'OK', onPress: () => signOut()},
                                ],
                                { cancelable: false }
                              )
                          
                        } else {
                            console.log(err)
                            setShowBtn(true)
                            Alert.alert(
                                'Network Error',
                                'Please Try Again',
                                [
                                  {text: 'OK', onPress: () => setShowBtn(true)},
                                ],
                                { cancelable: false }
                              )
                        }
         
                          
                    
         
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
                        intake_id: 1
                      
                    }
                    axios.post('https://conduit.detechnovate.net/public/api/user/book/group/slot', data, {headers: {Authorization: res}})
                    .then(
                        res => {  
                           console.log(res, "success")
                            const message = res.data.message; 
                           toggleOverlay()
                            setShowBtn(true)
                        }
                    )
                    .catch(err => {
                        console.log(err.response)
                        const code = err.response.status;
                        const message = err.response.message
                        if (code === 400) {
                            setShowBtn(true)
                            Alert.alert(
                                message,
                                'Please Try Another',
                                [
                                  {text: 'OK', onPress: () => setShowBtn(true)},
                                ],
                                { cancelable: false }
                              )
                        }
                        else if (code === 401) {
                            Alert.alert(
                                'Error!',
                                'Expired Token',
                                [
                                  {text: 'OK', onPress: () => signOut()},
                                ],
                                { cancelable: false }
                              )
                          
                        } else {
                            console.log(err)
                            setShowBtn(true)
                            Alert.alert(
                                'Network Error',
                                'Please Try Again',
                                [
                                  {text: 'OK', onPress: () => setShowBtn(true)},
                                ],
                                { cancelable: false }
                              )
                        }
         
                          
                    
         
                    })
                }
            )
            .catch( err => {console.log(err)})
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
                <MyAppText style= {styles.textStyle}>
                        {displayDate}
                </MyAppText>
          </View>
          <View style= {styles.dateContainer}>
          <MyAppText style= {styles.label}>Appointment Time</MyAppText>
                <MyAppText style= {styles.textStyle}>
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


          </View>
          </View>
          <View style= {styles.btnContainer}>
          {showBtn ?   <InnerBtn onPress={confirmAppointment} color= "white" bg= "#51087E" text= "Confirm" /> : <ActivityIndicator size= "large" color= "#000075"/>}
               
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
        borderBottomWidth: 3,
        width: '100%',
        // alignItems: 'flex-start',
        overflow: 'visible',
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

export default PatientDetails