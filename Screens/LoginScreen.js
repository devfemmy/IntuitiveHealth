import React, { Component, useState, useContext } from 'react';
import { View, StyleSheet,Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import FormInput from '../Components/FormInput';
import MyBtn from '../Components/MyBtn';
import { AuthContext } from '../Navigations/DrawerNav';

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
                    <Text style= {styles.label}>Email Address</Text>
                    <FormInput 
                    placeholder= "Member Id/Email Address" 
                    placeholderTextColor= "grey"
                    secureTextEntry = {false}
                    value={email}
                    onChangeText={setUsername}
                    />
                    </View>

                    <View style= {styles.textboxContainer}>
                    <Text style= {styles.label}>Password</Text>
                    <FormInput 
                    placeholder= "Password" 
                    style= {styles.passwordInput}
                    placeholderTextColor= "grey"
                    secureTextEntry = {hidePassword}
                    value={password}
                    onChangeText={setPassword}
                    />   
                    <TouchableOpacity onPress= {setPasswordVisibility} style={styles.touachableButton}>
                     <Image style= {styles.imageStyle} source= {(hidePassword) ? require('./../assets/sliders/images/visibility_off.png'):require('./../assets/sliders/images/visibility.png') } />
                    </TouchableOpacity>
                    </View>
                    <View style= {styles.lowerContainer}>
                      <Text onPress={() => props.navigation.navigate('ForgotPass')} style= {styles.passText}>Forgot Password?</Text>
                      <MyBtn onPress= {logInUser} btnText = "Sign In" />
                      <Text style= {{textAlign: 'center', fontSize: 16, color: '#A884BF'}}>Dont have an account? 
                       <Text style= {{color: 'white', fontWeight: 'bold'}}> Registor Now</Text>
                         </Text>
                      <View style= {styles.lowerText}>
                      <Text style= {{textAlign: 'center', fontSize: 16, color: '#A884BF'}}>
                        Trouble signing in?
                      </Text>
                      <Text onPress={() => props.navigation.navigate('Faq')} style= {{textAlign: 'center', fontSize: 16, color: '#fff'}}>
                        Contact Customer Support
                      </Text>
                      </View>
                      <Text style= {{textAlign: 'center', fontSize: 16, color: '#A884BF'}}>By continuing, you agree to
                       <Text style= {{color: 'white', fontWeight: 'bold'}}> Terms & Conditions</Text>
                        </Text>
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
    color: 'white',
    fontWeight: 'bold'
  },
  formContainer:{
    alignItems: 'center',
    marginVertical: 50
  },
  label: {
    color: '#A884BF',
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
export default LoginScreen