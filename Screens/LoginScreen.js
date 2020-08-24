import React, { Component, useState, useContext } from 'react';
import { View, StyleSheet,Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import FormInput from '../Components/FormInput';
import MyBtn from '../Components/MyBtn';
import { AuthContext } from '../Navigations/DrawerNav';
import MyAppText from '../Components/MyAppText';

const LoginScreen = (props) => {
  const {signIn} = useContext(AuthContext);
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [language, setLanguage] = useState('React');

  const setPasswordVisibility = () => {
    setHidePassword(!hidePassword);
  }

  const logInUser = ()=> {
    signIn({token:'token'});
  }
  return (
    <ScrollView style= {styles.container}>
                  <View style= {styles.inputContainer}>
                    <View style= {styles.formContainer}>
                        <Image 
                        style= {styles.logoImg}
                        source= {require('./../assets/sliders/images/logo.png')} />
                    </View>
                    <View>
                    <MyAppText style= {styles.label}>Email Address</MyAppText>
                    <FormInput 
                    placeholder= "Member Id/Email Address" 
                    color= "#1F1F1F"
                    selectionColor= "#1F1F1F"
                    placeholderTextColor= "#E8E8E8"
                    secureTextEntry = {false}
                    value={email}
                    onChangeText={setUsername}
                    />
                    </View>

                    <View style= {styles.textboxContainer}>
                    <MyAppText style= {styles.label}>Password</MyAppText>
                    <FormInput 
                    placeholder= "Password" 
                    style= {styles.passwordInput}
                    color= "#1F1F1F"
                    selectionColor= "#1F1F1F"
                    placeholderTextColor= "#E8E8E8"
                    secureTextEntry = {hidePassword}
                    value={password}
                    onChangeText={setPassword}
                    />   
                    <TouchableOpacity onPress= {setPasswordVisibility} style={styles.touachableButton}>
                     <Image style= {styles.imageStyle} source= {(hidePassword) ? require('./../assets/sliders/images/visibility_off.png'):require('./../assets/sliders/images/visibility.png') } />
                    </TouchableOpacity>
                    </View>
                    <View style= {styles.lowerContainer}>
                      <MyAppText onPress={() => props.navigation.navigate('ForgotPass')} style= {styles.passText}>Forgot Password?</MyAppText>
                      <MyBtn onPress= {logInUser} btnText = "Sign In" />
                      <MyAppText style= {{textAlign: 'center', fontSize: 16, color: '#9B9B9B'}}>Dont have an account? 
                       <MyAppText style= {{color: '#51087E', fontWeight: 'bold'}}> Registor Now</MyAppText>
                         </MyAppText>
                      <View style= {styles.lowerText}>
                      <MyAppText style= {{textAlign: 'center', fontSize: 16, color: '#9B9B9B'}}>
                        Trouble signing in?
                      </MyAppText>
                      <MyAppText onPress={() => props.navigation.navigate('Faq')} style= {{textAlign: 'center', fontSize: 16, color: '#51087E'}}>
                        Contact Customer Support
                      </MyAppText>
                      </View>
                      <MyAppText style= {{textAlign: 'center', fontSize: 16, color: '#9B9B9B'}}>By continuing, you agree to
                       <MyAppText style= {{color: '#51087E', fontWeight: 'bold'}}> Terms & Conditions</MyAppText>
                        </MyAppText>
                    </View>
                 
               
                </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 50
  },
  lowerText: {
    marginVertical: 35
  },
  passText: {
    color: '#464646',
    fontWeight: 'bold'
  },
  formContainer:{
    alignItems: 'center',
    marginVertical: 50
  },
  label: {
    color: '#9B9B9B',
    fontSize: 13
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
    backgroundColor: '#fff',
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
export default LoginScreen