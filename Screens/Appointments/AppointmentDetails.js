import React, { useState, useEffect } from 'react';
import { View, StyleSheet,ActivityIndicator,Alert, ScrollView, AsyncStorage } from 'react-native';
import DoctorCard from '../../Components/DoctorCard';
import MyAppText from '../../Components/MyAppText';
import InnerBtn from '../../Components/InnerBtn';
import PhoneIcon from '../../assets/sliders/images/phone.svg';
import ChatIcon from '../../assets/sliders/images/vc.svg';
import axios from '../../axios-req';
import errorHandler from '../ErrorHandler/errorHandler';

const AppointmentDetails = (props) => {
    const {doctor, lastname, image, slot_id, time, patient_session, status} = props.route.params;
    const [loader, setLoading] = useState(false);
    const [cancelBtn, setCancelBtn] = useState(true);
    const [callBtn, setCallBtn] = useState(true);
    const [sessionActive, setSession] = useState(true);
    const [color_code, setColorCode] = useState('black');
    const [token, setToken] = useState('');
    const [session, setVideoSession] = useState('');
    const [apiKey, setKey] = useState('');
    const [time_left, setTimeLeft] = useState('');
    const [history_id, setHistory_id] = useState('');
    const [error, setError] = useState(false)

    let interval = null;

    const getToken = () => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get(`user/my/slots/token/${patient_session}`, {headers: {Authorization: res}})
                .then(
                  
                    res => { 
                        console.log('token fetch', res.data);
                        const data = res.data.data;
                        const session = data.session_id;
                        const token = data.token;
                        const apiKey = data.api_key;
                        const time_left = data.time_left;
                        const history_id = parseInt(data.history_id)
                        setToken(token);
                        setKey(apiKey);
                        setVideoSession(session);
                        setTimeLeft(time_left);
                        setHistory_id(history_id)
                        setColorCode('#58C315');
                        //   setCancelBtn(false);
                          setCallBtn(false)
                          setCancelBtn(false);
                          setSession(true);
                                           
                    }
                )
                .catch(err => {
                    setLoading(false)   
                    setError(true)   
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    const checkStatus = () => {
        if (status === 'Booked') {
            setColorCode('#FC7E00')
        } else if (status === 'Cancelled') {
            setColorCode('#D30C0C')
            setCancelBtn(false)
        }
        else if (status === 'Complete') {
            setColorCode('purple')
            setCancelBtn(false)
        }
        
        else if (status === "Confirmed" && patient_session === 0) {
            setColorCode('#58C315');
            setCancelBtn(false);
            // setCallBtn(false)
        } else if (status === "Confirmed" && patient_session >= 0) {
            // setColorCode('#6C0BA9')
            setColorCode('#58C315');
            setCancelBtn(false);
            setSession(false);
            interval = setInterval(() => getToken(), 30000);
           
        } 
    }
    
    useEffect(() => { 

        const subscribe = props.navigation.addListener('focus', () => {
            checkStatus()

        });
        const unsubscribe = props.navigation.addListener('blur', () => {
           clearInterval(interval)
        });

        return unsubscribe, subscribe
    }, [props.navigation])

   
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
                axios.get(`user/my/slot/cancel/${slot_id}`, {headers: {Authorization: res}})
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
                    setLoading(false);
                    setError(true)        
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    const fetchSessionToken = () => {
        if (time_left > 0) {
            props.navigation.navigate('Virtual', {key: apiKey, sessionId: session, token: token, time_left: time_left, history_id: history_id})
        }else {
            Alert.alert(
                'Error!',
                'Session has Ended',
                [
                  {text: 'OK', onPress: () => props.navigation.popToTop()},
                ],
                { cancelable: false }
              )
        }
      
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
        flexContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around'
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
            width: '100%',
            justifyContent: 'center'
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
            {sessionActive ? 
            <View style= {styles.btnContainer}>
            {callBtn ? 
                            <View>
                            {cancelBtn ? 
                              <View>
                              {loader ? <ActivityIndicator  size="large" color="#51087E" /> :
                              <InnerBtn onPress= {alertUser} border= "#51087E" bg= "#51087E" color= "white" text= "Cancel Appointment" />
                              
                              }
                              </View> : 
                              
                              <InnerBtn onPress= {() => props.navigation.popToTop()} border= "#51087E" bg= "#51087E" color= "white" text= "Back to Appointments" />             
                        }
                            </View> : (
                                <>
                                <View style= {styles.callContainer}>
                                    <InnerBtn
                                    onPress= {()=> props.navigation.navigate('Voice')} 
                                    bg= "#880ED4" color= "white" icon= {<PhoneIcon width= {18} height= {18} />} text= "Voice Call" />
                                    </View>
                                
                                    <View style= {styles.callContainer}>
                                    <InnerBtn
                                    onPress= {fetchSessionToken}  
                                    bg= "#51087E" color= "white" icon= {<ChatIcon width= {18} height= {18} />} text= "Virtual Call" />
                                    </View>
                                </>
                            )
        }
        </View> : <MyAppText style= {{textAlign: 'center', marginVertical: 20}}>Checking For session...</MyAppText>
        
        }

        </ScrollView>
    )
}



export default errorHandler(AppointmentDetails, axios);