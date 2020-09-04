import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView,ActivityIndicator, AsyncStorage } from 'react-native';
import InnerBtn from '../../Components/InnerBtn';
import ProfileInput from '../../Components/ProfileInput';
import axios from '../../axios-req';

const Personal = (props) => {
    const [dob, setDob] = React.useState('java');
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled2, setIsEnabled2] = React.useState(false);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [showLoaded, setShowLoaded] = useState(false);
    const [location, setLocation] = useState('');
    const [showBtn, setShowBtn] = useState(true);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState('');
    const [loading, setLoading] = useState(true)
    
    
    useEffect(() => {
      const id = AsyncStorage.getItem('Mytoken').then(
          res => {
             console.log('synch', res)
              axios.get('details', {headers: {Authorization: res}})
              .then(
                
                  res => {
                      setLoading(false)
                      console.log("profile-toks", res.data)
                      const profile = res.data.data;
                      const lastname = profile.last_name;
                      const firstname = profile.name;
                      const email = profile.email;
                      const occupation = profile.occupation;
                      const location = profile.location;
                      setFirstname(firstname);
                      setLastname(lastname);
                      setEmail(email);
                      setOccupation(occupation)
                      setLocation(location)
                     
                  }
              )
              .catch(err => {
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
                    setLoading(false)
                      Alert.alert(
                          'Network Error',
                          'Please Try Again',
                          [
                            {text: 'OK', onPress: () => setShowBtn(true)},
                          ],
                          { cancelable: false }
                        )
                  }
  
                    
                    console.log(err.response.status)
  
              })
          }
      )
      .catch( err => {console.log(err)}) 
      
  
    }, []);
    const  editProfile = () => {
        setShowBtn(false)
       const id = AsyncStorage.getItem('Mytoken').then(
           res => {
               const data = {
                   last_name:  lastname,
                   first_name: firstname,
                   location: location,
                   occupation: occupation,
               }
               axios.post('update', data, {headers: {Authorization: res}})
               .then(
                   res => {  
                      console.log(res)
                       const message = res.data.message; 
                       alert(message);
                       setShowBtn(true)
                   }
               )
               .catch(err => {
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
                       setShowBtn(true)
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
     if (loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <ActivityIndicator  size="large" color="#51087E" />
        </View>
      );
    }
    return (
        <ScrollView style= {styles.container}>
                <View>
              <View style= {styles.profileCont}>
                <View style= {styles.inputContainer}>
                    <View style= {styles.flexContainer}>
                        <ProfileInput onChangeText = {(value) => setFirstname(value)}  value= {firstname} width= "45%" label= "First name" />
                        <ProfileInput onChangeText = {(value) => setLastname(value)} value= {lastname} width= "45%"  label= "Last name" />
                    </View>
                    {/* <ProfileInput value= {08120202020} keyboardType= "numeric" label= "Phone Number" /> */}
                    <ProfileInput editable= {false} value= {email} keyboardType= "email-address" label= "Email Address" />
                    <ProfileInput  onChangeText = {(value) => setLocation(value)} value= {location} keyboardType= "default" label= "Location" />
                    <View style= {styles.flexContainer}>
                        <ProfileInput  onChangeText = {(value) => setOccupation(value)} value= {occupation} width= "100%" label= "Occupation" />
                    </View>
                    {/* <View style= {styles.flexContainer}>
                      <View style= {styles.pickerContainer}>
                        <PickerInput
                          placeholder= "Marital Status"
                          items= {[
                            { label: 'Single', value: 'single' },
                            { label: 'Mariied', value: 'married' },
                            { label: 'Divorce', value: 'divorce' },
                        ]} />
                      </View>
                      <View style= {styles.pickerContainer}>
                        <PickerInput
                          placeholder= "Gender"
                          items= {[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                        ]} />
                      </View>
                    </View>
                    <View style= {styles.flexContainer}>
                      <View style= {styles.pickerContainer}>
                        <PickerInput
                          placeholder= "Select State"
                          items= {[
                            { label: 'Lagos', value: 'lagos' },
                            { label: 'Osun', value: 'osun' },
                        ]} />
                      </View>
                      <View style= {styles.pickerContainer}>
                        <PickerInput
                          placeholder= "Select City"
                          items= {[
                            { label: 'Ikeja', value: 'ikeja' },
                            { label: 'Ipaja', value: 'ipaja' },
                        ]} />
                      </View>
                    </View>
                    <View>
                      <PickerInput 
                      placeholder= "Select Country"
                      items= {[
                        { label: 'Nigeria', value: 'nga' },
                        { label: 'Ghana', value: 'ghn' },
                    ]} />
                    </View> */}
                </View>
                {showBtn ?   <InnerBtn onPress= {editProfile} text= "Save" color= "#fff" bg= "#51087E" /> : <ActivityIndicator size= "large" color= "#000075"/>}
              
            </View>
    </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 20
    },
    inputContainer: {
      marginBottom: 50
    },
    textStyle: {
        color: '#9B9B9B'
    },
    textStyle2: {
        color: '#464646',
        fontWeight: 'bold'
    },
    labelStyle: {
      fontFamily: 'HammersmithOne-Regular' 
    },
    switchContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 40,
      marginBottom: 15
  },
    profileCont: {
      paddingVertical: 20
    },
    lastcontainer: {
      marginVertical: 15
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    pickerContainer: {
      width: '45%',
      marginVertical: 8
    },
    bmiText: {
      color: '#51087E',
      fontSize: 28,
      marginBottom: 25,
      textAlign: 'left'
    },
    resultContainer: {
      marginVertical: 40
    },
    bmiStyle: {
      fontSize: 22
    },
    bmiStyle2: {
      fontSize: 34,
      color: '#6C0BA9'
    },
    touchbtn: {
      backgroundColor: '#D30C0C0B',
      borderWidth: 1,
      borderColor: '#E6C300',
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      height: 35
    },
    btnTextStyle: {
      color: '#E6C300'
    }
});

export default Personal;
