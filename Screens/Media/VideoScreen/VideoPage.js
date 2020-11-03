import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView,Alert,
    AsyncStorage,ActivityIndicator,
    Text, Dimensions } from 'react-native';
import Icon from '../../../assets/sliders/images/videoicon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyAppText from '../../../Components/MyAppText';
import InnerBtn from '../../../Components/InnerBtn';
import axios from 'axios';



const VideoPage = (props) => {
    // const [token, setToken] = useState('');
    // const [session, setVideoSession] = useState('');
    // const [apiKey, setKey] = useState('');
    const [loader, setLoading] = useState(false);
    const {patient_session} = props.route.params;

    let interval = null;

    const getToken = () => {
        setLoading(false)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get(`https://conduit.detechnovate.net/public/api/user/my/slots/token/${patient_session}`, {headers: {Authorization: res}})
                .then(
                  
                    res => { 
                        console.log('token fetch', res.data);
                        const data = res.data.data;
                        const session = data.session_id;
                        const token = data.token;
                        const apiKey = data.api_key;
                        const time_left = data.time_left;
                        const history_id = data.history_id;
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
                        // props.navigation.navigate('Virtual', {key: apiKey, sessionId: session, token: token, time_left: time_left, history_id: history_id})
                        // setToken(token);
                        // setKey(apiKey);
                        // setVideoSession(session);
                        setLoading(true)
                                           
                    }
                )
                .catch(err => {
                    console.log(err.response, "error")
                    const message = err.response.data.message
                    setLoading(true)      
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
                      
                    } else if (code === 400) {
                      setLoading(false)
                        Alert.alert(
                            'Error!',
                            message,
                            [
                              {text: 'OK', onPress: () =>  setLoading(false)},
                            ],
                            { cancelable: false }
                          )
                    } else {
                        alert('Please try again')
                    }
    
                      
                      console.log(err.response.status)
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    useEffect(() => { 

        const subscribe = props.navigation.addListener('focus', () => {
            getToken()

        });
        const unsubscribe = props.navigation.addListener('blur', () => {
           clearInterval(interval)
        });

        return unsubscribe, subscribe
    }, [props.navigation])
    return (
        <View style= {styles.container}>
        <View>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Active')} style= {styles.videoContainer}>
                <Icon width= {300} height= {250} />
                <MyAppText  style= {styles.textStyle}>Video Consultations</MyAppText>
                <MyAppText style= {styles.textStyle2}>Please wait while we try to fetch your session token.</MyAppText>
            </TouchableOpacity>
        </View>
        <View style= {styles.btnContainer}>
        {loader ?   <InnerBtn onPress= {getToken} width= "100%" text= "Retry" color= "white" bg= "#51087E" /> : <ActivityIndicator size= "large" color= "#000075"/>}
       
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        height: Dimensions.get('window').height,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    videoContainer: {
        marginVertical: 100,
        alignItems: 'center'
    },
    textStyle: {
        color: '#1F1F1F',
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 18
    },
    textStyle2: {
        color: '#9B9B9B',
        marginHorizontal: 70,
        textAlign: 'center'
    },
    btnContainer: {
        // backgroundColor: 'white',
        width: '80%'
    }
});

export default VideoPage