import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet,Text,Alert,
    ActivityIndicator,AsyncStorage,
    TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
// import MyBtn from '../Components/MyBtn';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import CustomHeaderButton from '../Components/HeaderButton';
import axios from '../../axios-req';
import FormInput from '../../Components/FormInput';
import MyAppText from '../../Components/MyAppText';
import InnerBtn from '../../Components/InnerBtn';
import errorHandler from '../ErrorHandler/errorHandler'

const GetOtp = (props) => {
  const [token, setUsername] = useState('');
  const [button, setButton] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resendOtp, setResend] = useState(true)

  const retriveOTP = () => {
    setLoading(true)
    const id = AsyncStorage.getItem('Mytoken').then(
        res => {

            axios.get('user/send/otp',  {headers: {Authorization: res}})
            .then(
                res => {
                    const otp = res; 
                    console.log("otp success", otp) 
                    const message = res.data.message;
                    setLoading(false)
                        Alert.alert(
                        'Alert!',
                        message,
                        [
                          {text: 'OK', onPress: () => null},
                        ],
                        { cancelable: false }
                      )
                     
                 
                }
            )
            .catch(err => {
                setError(true)
                setLoading(false)
                // console.log("otp error", err.response) 
                // const code = err.response.status;
                // if (code === 401) {
                //     Alert.alert(
                //         'Error!',
                //         'Expired Token',
                //         [
                //           {text: 'OK', onPress: () => null},
                //         ],
                //         { cancelable: false }
                //       )
                  
                // } else {
                //     // showLoaded(true)
                //     Alert.alert(
                //         'Network Error',
                //         'Please Try Again',
                //         [
                //           {text: 'OK', onPress: () => setShowBtn(true)},
                //         ],
                //         { cancelable: false }
                //       )
                // }

                  
                

            })
        }
    )
    .catch( err => {console.log(err)}) 
}
useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      retriveOTP()       
      });     
    return unsubscribe;
  }, [props.navigation]);

  const resendConfirmToken = () => {
    setResend(false)
    retriveOTP()
  }
  const confirmToken = () => {
    if (token === '') {
      alert("Please fill in token sent to you")
  } else {
     setButton(true)
      const data = {
        otp: token
      }
      const id = AsyncStorage.getItem('Mytoken').then(
        res => {

          axios.post('verify/otp', data,  {headers: {Authorization: res}})
          .then( res => {
            setButton(false)
            console.log('password', res.data)
            const response = res.data.message;
            Alert.alert(
              'Alert',
              response,
              [
                {text: 'OK', onPress: () =>  props.navigation.navigate('History')},
              ],
              { cancelable: false }
            )
            // if (response.status === 1) {
    
            // }else {
            //   setButton(false)
         
            //   alert('incorrect email')
            // }
            
          }).catch(err => {
              setButton(false)
              const code = err.response.status;
              if (code === 400) {
                alert('Incorrect Token')
              }
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
                //   setBtn(false)
                  Alert.alert(
                      'Network Error',
                      'Please Try Again',
                      [
                        {text: 'OK', onPress: () =>  setButton(false)},
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
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <ActivityIndicator  size="large" color="#51087E" />
      </View>
    );
  }
  return (
    <ScrollView style= {styles.container}>
                {/* <View style= {styles.backContainer}>
                    <TouchableOpacity onPress= {() => props.navigation.goBack()}>
                        <Image 
                        style= {{width: 50, height: 50}}
                        source= {require('../assets/sliders/images/back.png')} />
                    </TouchableOpacity>

                </View> */}
                  <View style= {styles.inputContainer}>
                    <View style= {styles.formContainer}>
                        <MyAppText style= {styles.forgotText}>Enter OTP</MyAppText>
                    </View>
                    <View style= {styles.textContainer}>
                    <MyAppText style= {styles.label}>Enter OTP Sent To Email Address</MyAppText>
                    <FormInput
                    keyboardType= "numeric"
                    placeholder= "token" 
                    color= "white"
                    selectionColor= "white"
                    placeholderTextColor= "#9B9B9B"
                    secureTextEntry = {false}
                    value={token}
                    onChangeText={setUsername}
                    />
                    {resendOtp ? (
                       <MyAppText onPress= {resendConfirmToken} style= {styles.otpText}>Resend OTP</MyAppText>
                    ): null}
                   
                     {button ? <ActivityIndicator  size="large" color="#fff" /> :
                   <InnerBtn onPress= {confirmToken} text= "Continue" bg= "white" color= "#51087E" />}
                    </View>               
               
                </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 50
  },
  backContainer: {
    marginVertical: 30
  },
  lowerText: {
    marginVertical: 35
  },
  forgotText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  passText: {
    color: 'white',
    fontWeight: 'bold'
  },
  formContainer:{
    marginVertical: 50
  },
  label: {
    color: '#A884BF',
    fontSize: 13
  },
  textContainer: {
    marginVertical: 30,
  },
  touachableButton: {
    position: 'absolute',
    right: 3,
    height: 20,
    width: 35,
    padding: 2
  },
  imageStyle: {
    width: 30,
    height: 30
  },
  otpText: {
    color: 'white',
    marginVertical: 15,
    textAlign: 'center'
  },
  passwordInput: {
    fontSize: 22,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5,
  },
  textboxContainer: {
    marginTop: 5,
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#51087E',
    color: 'white',
    flex: 1,
    paddingHorizontal: 30,
  },
  lowerContainer: {
    marginVertical: 10
  },
  logoImg: {
    width: 270,
    height: 100,
    resizeMode: 'contain'
  }
})
export default errorHandler(GetOtp, axios)