import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator,AsyncStorage  } from 'react-native';
import FormInput from '../../../Components/FormInput';
import MyAppText from '../../../Components/MyAppText';
import PasswordIcon from '../../../assets/sliders/images/password.svg'
import InnerBtn from '../../../Components/InnerBtn';
import axios from 'axios';
const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [Password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [button, setButton] = useState(false);

    const changeMyPassword = () => {
        if (oldPassword === '' || Password === '' || newPassword === '') {
            alert('Password fields cannot be empty')
        }else {
            if (Password !== newPassword) {
                alert("Password does not match")
            }else {
                setButton(true)
                const id = AsyncStorage.getItem('Mytoken').then(
                    res => {
                        const data = {
                            old_password: oldPassword,
                            new_password: Password,
                            c_password: newPassword
                            
                        }
                        axios.post('https://conduit.detechnovate.net/public/api/user/change/password', data, {headers:{Authorization:res}})
                        .then(
                            res => {  
                                console.log(res, "CHANGE")
                                const message = res.data.message;
                                alert(message)
                                setButton(false)
                            }
                        )
                        .catch(err => {
                            setButton(false)
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
                              
                            } else {
                                setLoader(true)
                                Alert.alert(
                                    'Network Error',
                                    'Please Try Again',
                                    [
                                      {text: 'OK', onPress: () =>   setLoader(true)},
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
      
    }
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.flexedContainer}>
                    <PasswordIcon width= {250} height= {200} />
            </View>
            <View>
            <FormInput 
                    placeholder= "Enter Old Password" 
                    color= "#1F1F1F"
                    selectionColor= "#1F1F1F"
                    placeholderTextColor= "#E8E8E8"
                    secureTextEntry = {true}
                    value={oldPassword}
                    onChangeText={(oldPassword) => setOldPassword(oldPassword)}
                    />
                    <FormInput 
                    placeholder= "Enter New Password" 
                    color= "#1F1F1F"
                    selectionColor= "#1F1F1F"
                    placeholderTextColor= "#E8E8E8"
                    secureTextEntry = {true}
                    value={Password}
                    onChangeText={(Password) => setPassword(Password)}
                    />
                    <FormInput 
                    placeholder= "Confirm New Password" 
                    color= "#1F1F1F"
                    selectionColor= "#1F1F1F"
                    placeholderTextColor= "#E8E8E8"
                    secureTextEntry = {true}
                    value={newPassword}
                    onChangeText={(newPassword) => setNewPassword(newPassword)}
                    />
                    <View style= {styles.btnContainer}>
                    {button ? <ActivityIndicator  size="large" color="#6C0BA9" /> :
                    <InnerBtn onPress= {changeMyPassword} border= "#6C0BA9" color= "white" bg= "#6C0BA9" text= "Change Password" />}
                    </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: '8%'
    },
    flexedContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    btnContainer: {
        marginVertical: 20
    }
});

export default ChangePassword