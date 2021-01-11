import React, { Component, useState, useContext } from 'react';
import { View, StyleSheet,Text,Alert, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import FormInput from '../Components/FormInput';
import MyBtn from '../Components/MyBtn';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../Components/HeaderButton';
import InnerBtn from '../Components/InnerBtn';
import axios from 'axios';
import MyAppText from '../Components/MyAppText';

const RegisterUser = (props) => {
 const [firstname, setFirstName] = useState('');
 const [last_name, setLastName] = useState('')
 const [password, setPassword] = useState('')
 const [c_password, setConfirmPas] = useState('')
  const [email, setEmail] = useState('');
  const [button, setButton] = useState(false);

  const resetPassword = () => {
    if (email === '' || firstname === '' || last_name === '' 
    || password === '' || c_password === '') {
      alert("Please fill in your correct credentials")
  } else if (password !== c_password) {
    alert("Password does not match")  
  }else {
     setButton(true)
      const data = {
          name: firstname.trim(),
          last_name: last_name.trim(),
          password: password.trim(),
          c_password: c_password.trim(),
          email: email.trim()
      }
      axios.post('https://conduit.detechnovate.net/public/api/conduithealth/user/register', data)
      .then( res => {
        setButton(false)
          console.log('register', res.data)
        const response = res.data.message;
        Alert.alert(
          'Alert',
          response,
          [
            {text: 'OK', onPress: () =>  props.navigation.navigate('Login')},
          ],
          { cancelable: false }
        )
        // if (response.status === 1) {

        // }else {
        //   setButton(false)
     
        //   alert('incorrect email')
        // }
        
      }).catch(err => {
          setButton(false);
          console.log("errors", err.response)
          const code = err.response.status;
          if (code === 400) {
            alert('Incorrect Email')
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
              setBtn(false)
              Alert.alert(
                  'Network Error',
                  'Please Try Again',
                  [
                    {text: 'OK', onPress: () =>  setBtn(false)},
                  ],
                  { cancelable: false }
                )
          }
      })
     


  }
  }



  return (
    <ScrollView style= {styles.container}>
                  <View style= {styles.inputContainer}>
                    <View style= {styles.formContainer}>
                        <MyAppText style= {styles.forgotText}>Getting Started</MyAppText>
                    </View>
                    <View style= {styles.textContainer}>
                    <MyAppText style= {styles.label}>First Name</MyAppText>
                    <FormInput
                    // label = "Email Address"
                    // placeholder= "Member Id/Email Address" 
                    color= "white"
                    selectionColor= "white"
                    placeholderTextColor= "#9B9B9B"
                    secureTextEntry = {false}
                    value={firstname}
                    onChangeText={setFirstName}
                    />
                    <MyAppText style= {styles.label}>Last Name</MyAppText>
                    <FormInput
                    // label = "Email Address"
                    // placeholder= "Member Id/Email Address" 
                    color= "white"
                    selectionColor= "white"
                    placeholderTextColor= "#9B9B9B"
                    secureTextEntry = {false}
                    value={last_name}
                    onChangeText={setLastName}
                    />
                    <MyAppText style= {styles.label}>Email Address</MyAppText>
                    <FormInput
                    // label = "Email Address"
                    // placeholder= "Member Id/Email Address" 
                    color= "white"
                    keyboardType = {"email-address"}
                    selectionColor= "white"
                    placeholderTextColor= "#9B9B9B"
                    secureTextEntry = {false}
                    value={email}
                    onChangeText={setEmail}
                    />
                    <MyAppText style= {styles.label}>Password</MyAppText>
                    <FormInput
                    // label = "Email Address"
                    // placeholder= "Member Id/Email Address" 
                    color= "white"
                    selectionColor= "white"
                    placeholderTextColor= "#9B9B9B"
                    secureTextEntry = {true}
                    value={password}
                    onChangeText={setPassword}
                    />
                    <MyAppText style= {styles.label}>Confirm Password</MyAppText>
                    <FormInput
                    // label = "Email Address"
                    // placeholder= "Member Id/Email Address" 
                    color= "white"
                    selectionColor= "white"
                    placeholderTextColor= "#9B9B9B"
                    secureTextEntry = {true}
                    value={c_password}
                    onChangeText={setConfirmPas}
                    />


                    </View>   
                    <View style= {{marginTop: 25}}>
                    {button ? <ActivityIndicator  size="large" color="#fff" /> :
                   <InnerBtn onPress= {resetPassword} text= "Register" bg= "white" color= "#51087E" />}
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
    fontSize: 13,
    marginBottom: -8,
    marginTop: 8
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
export default RegisterUser