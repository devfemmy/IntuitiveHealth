import React, { Component, useState, useContext } from 'react';
import { View, StyleSheet,Text,Alert, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import FormInput from '../Components/FormInput';
import MyBtn from '../Components/MyBtn';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../Components/HeaderButton';
import InnerBtn from '../Components/InnerBtn';
import axios from '../axios-req';
import errorHandler from './ErrorHandler/errorHandler';

const ForgotPassword = (props) => {
  const [email, setUsername] = useState('');
  const [button, setButton] = useState(false);
  const [error, setError] = useState(false)

  const resetPassword = () => {
    if (email === '') {
      alert("Please fill in your correct credentials")
  } else {
     setButton(true)
      const data = {
          email: email
      }
      axios.post('conduithealth/user/forgot_password', data)
      .then( res => {
        setButton(false)
          console.log('password', res.data)
        const response = res.data.message;
        Alert.alert(
          'Alert',
          response,
          [
            {text: 'OK', onPress: () =>  props.navigation.navigate('ResetToken')},
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
          setError(true)
      })
     
  }
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
                        <Text style= {styles.forgotText}>Forgot your Password?</Text>
                    </View>
                    <View style= {styles.textContainer}>
                    <Text style= {styles.label}>Enter your registered Email Address</Text>
                    <FormInput

                    placeholder= "Member Id/Email Address" 
                    color= "white"
                    selectionColor= "white"
                    placeholderTextColor= "#9B9B9B"
                    secureTextEntry = {false}
                    value={email}
                    onChangeText={setUsername}
                    />
                     {button ? <ActivityIndicator  size="large" color="#fff" /> :
                   <InnerBtn onPress= {resetPassword} text= "Reset Password" bg= "white" color= "#51087E" />}
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
export default errorHandler(ForgotPassword, axios);