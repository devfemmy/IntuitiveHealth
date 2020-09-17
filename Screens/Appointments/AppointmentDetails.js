import React, { useState, useEffect } from 'react';
import { View, StyleSheet,ActivityIndicator,Alert, ScrollView, AsyncStorage } from 'react-native';
import DoctorCard from '../../Components/DoctorCard';
import MyAppText from '../../Components/MyAppText';
import InnerBtn from '../../Components/InnerBtn';
import PhoneIcon from '../../assets/sliders/images/phone.svg';
import ChatIcon from '../../assets/sliders/images/vc.svg';
import axios from 'axios';

const AppointmentDetails = (props) => {
    const {doctor, lastname, image, slot_id, time, status} = props.route.params;
    const [loader, setLoading] = useState(false);
    const [cancelBtn, setCancelBtn] = useState(true)
    const [color_code, setColorCode] = useState('black');
    useEffect(() => { 
        if (status === 'Booked') {
            setColorCode('#FC7E00')
        } else if (status === 'Cancelled') {
            setColorCode('#D30C0C')
            setCancelBtn(false)
        }
    }, [])

   
    const alertUser = () => {
        Alert.alert(
            'Cancel Appointment!',
            'Are you sure you want to cancel appointment?',
            [{
                text: "Cancel",
                // onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {text: 'Yes', onPress: () => cancelAppointment()},
            ],
            { cancelable: false }
          )
    }
    const cancelAppointment = () => {
        setLoading(true)        
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get(`https://conduit.detechnovate.net/public/api/user/my/slot/cancel/${slot_id}`, {headers: {Authorization: res}})
                .then(
                  
                    res => {
                        setLoading(false)  
                        console.log('appointment,', res.data)  
                        const message = res.data.message;
                        Alert.alert(
                            'Alert',
                            message,
                            [
                              {text: 'OK', onPress: () =>  props.navigation.popToTop()},
                            ],
                            { cancelable: false }
                          )
                                           
                    }
                )
                .catch(err => {
                    console.log(err.response.data.message, "error")
                    const message = err.response.data.message
                    setLoading(false)      
                    const code = err.response.status;
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [
                              {text: 'OK', onPress: () => signOut()},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                      setLoading(false)
                        Alert.alert(
                            'Error!',
                            message,
                            [
                              {text: 'OK', onPress: () =>  setLoading(false)},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                      console.log(err.response.status)
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
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
            top: -35,
            left: 50,
            backgroundColor: color_code,
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
            color: color_code
        },
        btnContainer: {
            // display: 'flex',
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'space-between',
            padding: 20
        },
        callContainer: {
            width: '45%'
        }
    });
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.doctorContainer}>
            <DoctorCard 
                image= {{uri: image}}
                // college= "Obstetricians/Gynecologists"
                name= {`Dr ${doctor} ${lastname}`}
                // experience= "23 years experience overall"
                 />
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
                {time}
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
               Active Now
                </MyAppText>
            </View>
            {/* <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>
                    Booked For
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
                John Doe
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
               09033333333
                </MyAppText>
            </View> */}
            <View style= {styles.bookingPurpose}>
                <MyAppText style= {styles.label}>
                    Slot ID
                </MyAppText>
                <MyAppText style= {styles.textStyle}>
               {slot_id}
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
                   {status}
                </MyAppText>
            </View>
            <View style= {styles.btnContainer}>
                {cancelBtn ? 
                  <View>
                  {loader ? <ActivityIndicator  size="large" color="#51087E" /> :
                  <InnerBtn onPress= {alertUser} border= "#51087E" bg= "#51087E" color= "white" text= "Cancel Appointment" />
                  
                  }
                  </View> : 
                  
                  <InnerBtn onPress= {() => props.navigation.popToTop()} border= "#51087E" bg= "#51087E" color= "white" text= "Back to Appointments" />             
            }
                    {/* <View style= {styles.callContainer}>
                    <InnerBtn
                    onPress= {()=> props.navigation.navigate('Voice')} 
                    bg= "#880ED4" color= "white" icon= {<PhoneIcon width= {18} height= {18} />} text= "Voice Call" />
                    </View>
                  
                    <View style= {styles.callContainer}>
                    <InnerBtn
                     onPress= {()=> props.navigation.navigate('Virtual')}  
                    bg= "#51087E" color= "white" icon= {<ChatIcon width= {18} height= {18} />} text= "Virtual Call" />
                    </View> */}
            </View>
        </ScrollView>
    )
}



export default AppointmentDetails