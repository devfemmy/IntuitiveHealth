import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView,Alert,AsyncStorage, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../axios-req'
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';
import errorHandler from '../ErrorHandler/errorHandler';

const WaitingRoom = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [display_id, setMyId] = useState(0);
    const [error, setError] = useState(false);
    const {chat_id} = props.route.params;
    
    let interval = null
 

    const joinWaitingRoom = () => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('user/waiting/join', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log(res.data.data, "waiting room")
                        const appid = res.data.data.id;
                        console.log('join', appid)
                        interval = setInterval(() => getToken(appid), 30000);
                        setMyId(appid)
                        const message = `${res.data.message}!!! You are now in waiting room`
                        Alert.alert(
                            'Alert',
                            message,
                         
                            [
                              {text: 'OK'},
                            ],
                            { cancelable: false }
                          )
                       getToken()
                    }
                )
                .catch(err => {
                    console.log("error", err.response);
                    const errorData = err.response.data;
                    // const status = err.response.status;
                    setLoading(false);
                    const code = err.response.status;

                    
                    // setInterval(() => getToken(appid), 60000);
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [
                              {text: 'OK', onPress: () => signOut()},
                            ],
                            { cancelable: false }
                          )
                      
                    } else if (code === 403) {
                        const errorCode = errorData.error_code;
                        const userType = parseInt(errorData.user_type);
                        const msg = errorData.message;
                        if (userType === 1) {
                            Alert.alert(
                                "Error",
                                msg,
                                [
                                  {text: 'OK', onPress: () => props.navigation.navigate('Selfpay')},
                                ],
                                { cancelable: false }
                              )
                    }else {
                        Alert.alert(
                            "Error",
                            msg,
                            [
                              {text: 'OK', onPress: () => props.navigation.navigate('ExpiredSub')},
                            ],
                            { cancelable: false }
                          )
                    }
                    }
                    
                    else {
                        const message = err.response.data.message;
                        const request_id = parseInt(err.response.data.data.id);
                        console.log('request_id ID', request_id)
                        interval = setInterval(() => getToken(request_id), 30000);
                        setMyId(request_id)
                        

                        Alert.alert(
                            'Alert',
                            message,
                         
                            [
                              {text: 'OK' },
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                    
    
                }).finally(()=>{
                    getToken()
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    const cancelAppointment = () => {
        setLoading(true)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get(`user/waiting/cancel/${display_id}`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log(res, "waiting room")
                        const message = res.data.message;
                        Alert.alert(
                            'Alert',
                            message,
                         
                            [
                              {text: 'OK', onPress: () => props.navigation.goBack()},
                            ],
                            { cancelable: false }
                          )
                    }
                )
                .catch(err => {
                    console.log("error", err.response)
                    setLoading(false)
                    const code = err.response.status;
                    const message = err.response.data.message;
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
                        

                        Alert.alert(
                            'Alert',
                            message,
                         
                            [
                              {text: 'OK'},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                    
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    const getToken = (request_id) => {
        // setLoading(true)
      
        console.log('GET TOKEN BLOCK', request_id)
            const id = AsyncStorage.getItem('Mytoken').then(
                res => {
    
                    axios.get(`user/waiting/token/${request_id}`, {headers: {Authorization: res}})
                    .then(
                        res => {
                            setLoading(false)
                            console.log(res, "token")
                            // clearInterval(timerId)
                            const key = res.data.data.api_key;
                            const session = res.data.data.session_id;
                            const token = res.data.data.token;
                            const time_left = res.data.data.time_left;
                            const history_id = res.data.data.history_id;
                            if (chat_id === 1) {
                                props.navigation.navigate('Virtual', {key: key, sessionId: session, token: token, 
                                time_left: time_left, history_id: history_id})
                            }
                            else {
                                props.navigation.navigate('Chat Room', {key: key, sessionId: session, token: token, 
                                    time_left: time_left, history_id: history_id})
                            }
                        }
                    )
                    .catch(err => {
                        console.log("error", err.response)
                        setLoading(false)
                        const code = err.response.status;
                        const message = err.response.data.message;
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
                            console.log("error", err)
                        }
        
                          
                        
        
                    })
                }
            )
            .catch( err => {console.log(err)}) 
        

    }
    useEffect(() => {
    
    const subscribe = props.navigation.addListener('focus', () => {
        joinWaitingRoom()
    //    cancelAppointment()
    });
    const unsubscribe = props.navigation.addListener('blur', () => {
       clearInterval(interval)
    //    cancelAppointment()
    //    clearInterval()
    });
      props.navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Exit Room?',
        'Exiting room will cancel any unsaved session. Are you sure you want to leave?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () =>  joinWaitingRoom() },
          {
            text: 'Leave',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
                    props.navigation.dispatch(e.data.action)
                

            },
          },
        ]
      );
    }
    
    )
    return unsubscribe, subscribe
},
  [props.navigation]);
    

      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#51087E', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#fff" />
          </View>
        );
      }
    console.log('RENDER', display_id)
    return (
        <View style= {styles.container}>
            <ScrollView>
                <View style= {styles.scroll}>
                    <MyAppText style= {styles.textStyle}>Please wait while we find you a doctor</MyAppText>
                </View>
                <View style= {styles.lowerContainer}>
                <MyAppText style= {styles.textStyle2}>Waiting No.</MyAppText>
                <MyAppText style= {styles.textStyle3}>43567890</MyAppText>
                </View>
            </ScrollView>
            <View style= {styles.footer}>
                <InnerBtn onPress= {cancelAppointment} text= "Cancel" color= "white" border= "#A020F0" bg= "#A020F0" />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#51087E',
        flex: 1
    },
    scroll: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 50
    },
    textStyle: {
        color: 'white'
    },
    textStyle2: {
        color: '#A884BF'
    },
    textStyle3: {
        color: '#FFFFFF'
    },
    lowerContainer: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 5,
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 50,
        padding: 15
    },
    footer: {
        minHeight: 150,
        padding: 25
       
    }
});

export default WaitingRoom