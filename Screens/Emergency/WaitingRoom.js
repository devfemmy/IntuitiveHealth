import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView,Alert,AsyncStorage, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../axios-req'
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';

const WaitingRoom = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appid, setId] = useState(null)
 

    const joinWaitingRoom = () => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('waiting/join', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log(res, "waiting room")
                        const appid = res.data.data.id;
                        console.log('join', appid)
                        setId(appid)
                        setInterval(() => getToken(appid), 60000);
                        const message = `${res.data.message}!!! You are now in waiting room`
                        Alert.alert(
                            'Alert',
                            message,
                         
                            [
                              {text: 'OK'},
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
                    const appid = parseInt(err.response.data.data.id);
                    console.log('APP ID', appid)
                    setId(appid)
                    setInterval(() => getToken(appid), 60000);
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
                              {text: 'OK' },
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                    
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    const cancelAppointment = () => {
        setLoading(true)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get(`waiting/cancel/${appid}`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log(res, "waiting room")
                        setId(0)
                        const message = res.data.message;
                        Alert.alert(
                            'Alert',
                            message,
                         
                            [
                              {text: 'OK'},
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
    const getToken = (value) => {
        // setLoading(true)
      
        console.log('GET TOKEN BLOACK', value)
        if (value === null) {
            return
        } else {
            const id = AsyncStorage.getItem('Mytoken').then(
                res => {
    
                    axios.get(`waiting/token/${value}`, {headers: {Authorization: res}})
                    .then(
                        res => {
                            setLoading(false)
                            console.log(res, "token")
                            // clearInterval(timerId)
                            const key = res.data.data.api_key;
                            const session = res.data.data.session_id;
                            const token = res.data.data.token
                            props.navigation.navigate('Virtual', {key: key, sessionId: session, token: token})
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

    }
    useEffect(() => {
        joinWaitingRoom()
      props.navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Exit Waiting Room?',
        'Exiting waiting room will cancel any pending appointment. Are you sure you want to leave?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Leave',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
                console.log('Cancelling appointment5', appid)
                if (appid === 0) {
                    console.log('hey this')
                    props.navigation.dispatch(e.data.action)
                }else {
                    e.preventDefault();
                    console.log('Cancelling appointment')
                    // cancelAppointment()
                    console.log('Cancelling appointment2')
                    props.navigation.dispatch(e.data.action)
                }

            },
          },
        ]
      );
    }
    
    )},
  [props.navigation]);
    

      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#51087E', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#fff" />
          </View>
        );
      }
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