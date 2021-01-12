import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet,Text,Alert,
    ActivityIndicator,AsyncStorage,
    TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
// import MyBtn from '../Components/MyBtn';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import CustomHeaderButton from '../Components/HeaderButton';
import axios from 'axios';
import FormInput from '../../Components/FormInput';
import MyAppText from '../../Components/MyAppText';
import InnerBtn from '../../Components/InnerBtn';

const GetOtp = (props) => {
  const [token, setUsername] = useState('');
  const [button, setButton] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const retriveOTP = () => {
    const id = AsyncStorage.getItem('Mytoken').then(
        res => {
            const data = {
                subscription_name: plan
            }
            axios.post('payment/initiate', data, {headers: {Authorization: res}})
            .then(
                res => {
                    setLoading(false)
                    const payment_plans = res.data.data;
                    setPaymentPlans(payment_plans);  
                    const amount = payment_plans.amount_to_pay;
                    const trans_id = payment_plans.tran_id;
                    setAmount(amount);
                    setReferenceNum(trans_id)
                    console.log('payment_plans', payment_plans)                     
                }
            )
            .catch(err => {
                setLoading(false)
                const code = err.response.status;
                if (code === 401) {
                    Alert.alert(
                        'Error!',
                        'Expired Token',
                        [
                          {text: 'OK', onPress: () => null},
                        ],
                        { cancelable: false }
                      )
                  
                } else {
                    // showLoaded(true)
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
useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
        const email_address = AsyncStorage.getItem('email').then(
            res => {
              setEmail(res)
              retriveOTP(res)
            }
        ).catch(
            err => {}
        )
       
      });     
    return unsubscribe;
  }, [props.navigation]);


  const confirmToken = () => {
    if (token === '') {
      alert("Please fill in token sent to you")
  } else {
     setButton(true)
      const data = {
          token: token
      }
      axios.post('https://conduit.detechnovate.net/public/api/conduithealth/user/verify_token', data)
      .then( res => {
        setButton(false)
          console.log('password', res.data)
        const response = res.data.message;
        const reset_token = res.data.data.reset_token;
        const email = res.data.data.email
        Alert.alert(
          'Alert',
          response,
          [
            {text: 'OK', onPress: () =>  props.navigation.navigate('ConfirmToken', {token: reset_token, email: email})},
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
  }
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <ActivityIndicator  size="large" color="#fff" />
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
                    <MyAppText style= {styles.otpText}>Resend OTP</MyAppText>
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
export default GetOtp