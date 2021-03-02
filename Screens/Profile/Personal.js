import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView,ActivityIndicator,Alert, AsyncStorage } from 'react-native';
import InnerBtn from '../../Components/InnerBtn';
import ProfileInput from '../../Components/ProfileInput';
import axios from '../../axios-req';
import { Container, Header, Content, DatePicker,Icon, Picker, Form } from 'native-base'
import MyAppText from '../../Components/MyAppText';
import errorHandler from '../ErrorHandler/errorHandler';

const Personal = (props) => {
    // const [dob, setDob] = React.useState('java');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [occupation, setOccupation] = useState('');
    const [location, setLocation] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [genoType, setGenotype] = useState('');
    const [showBtn, setShowBtn] = useState(true);
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('')
    const [loading, setLoading] = useState(true);
    const [chosenDate, setChosenDate] = useState(new Date);
    const [dateToBeSent, setDateToBeSent] = useState(new Date);
    const [selected, setSelected] = useState("M");
    const [error, setError] = useState(false)
    
    
    useEffect(() => {
      const id = AsyncStorage.getItem('Mytoken').then(
          res => {
            //  console.log('synch', res)
              axios.get('user/details', {headers: {Authorization: res}})
              .then(
                
                  res => {
                      setLoading(false)
                      const profile = res.data.data;
                      const lastname = profile.last_name;
                      const firstname = profile.name;
                      const email = profile.email;
                      const occupation = profile.occupation;
                      const location = profile.location;
                      const phone = profile.phone;
                      const genoType = profile.genotype;
                      const blood_group = profile.blood_group;
                      const dob = profile.dob;
                      const realDob = new Date (dob);
                      const gender = profile.gender;
                      console.log('set dob', dob)
                      setChosenDate(realDob)
                      setFirstname(firstname);
                      setLastname(lastname);
                      setEmail(email);
                      setOccupation(occupation)
                      setLocation(location);
                      setPhone(phone);
                      setSelected(gender);
                      setBloodGroup(blood_group);
                      setGenotype(genoType)
                     
                  }
              )
              .catch(err => {
                  const code = err.response.status;
                  setLoading(false)
                  setError(true)
  
              })
          }
      )
      .catch( err => {console.log(err)}) 
      
  
    }, []);

    const  editProfile = () => {
      // alert(chosenDate)
      // const slicedDate = chosenDate.toString().slice(0, -45);
      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    const formattedDate = formatDate(chosenDate);
    // console.log('Format', formattedDate)
    // alert(formattedDate)
      // const concatDate = `${slicedDate}`;
      // const newDateCreated2 = new Date(concatDate)
      // const realDate = newDateCreated2.toISOString().substring(0, 10);
      if (phone === '' || lastname === '' || firstname === '' ) {
        alert ('Fill details correctly')
      } else {
        setShowBtn(false)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                const data = {
                    last_name:  lastname,
                    first_name: firstname,
                    location: location,
                    occupation: occupation,
                    phone: phone,
                    gender: selected,
                    dob: formattedDate,
                    genotype: genoType,
                    blood_group: bloodGroup
                }
                axios.post('user/update', data, {headers: {Authorization: res}})
                .then(
                    res => {  
                       console.log(res)
                        const message = res.data.message; 
                        alert(message);
                        setShowBtn(true)
                    }
                )
                .catch(err => {
                  console.log('error', err.response)
                  setShowBtn(true);
                  setError(true)
                })
            }
        )
        .catch( err => {console.log(err)})
      }

     }

   const setDate = (newDate) => {
    // const subDate = newDate.subString(0, 10)
     setChosenDate(newDate);
     console.log('chosenDate', newDate)

    //  setDateToBeSent(realDate)
    //  console.log('real Date', new Date())

     
    }
    const onValueChange =(value) => {
      setSelected(value)
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
                    <Content style= {styles.dateContainer}>
                    <MyAppText style= {styles.labelStyle}>Gender</MyAppText>
                  <Form>
                    <Picker
                      mode="dropdown"
                      // iosIcon={<Icon name="arrow-down" />}
                      placeholder="Select your Gender"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      style={{ width: undefined }}
                      selectedValue={selected}
                      onValueChange={onValueChange}
                    >
                      <Picker.Item label="Male" value="M" />
                      <Picker.Item label="Female" value="F" />
                    </Picker>
                  </Form>
               </Content>
                    <Content style= {styles.dateContainer}>
                      {/* <MyAppText style= {styles.labelStyle}>Date of Birth</MyAppText> */}
                    <DatePicker
                      // defaultDate={chosenDate}
                      // value= {chosenDate}
                      // minimumDate={new Date(2018, 1, 1)}
                      // maximumDate={new Date(2018, 12, 31)}
                      mode= "date"
                      maximumDate={new Date()}
                      locale={"en"}
                      timeZoneOffsetInMinutes={60}
                      modalTransparent={true}
                      animationType={"fade"}
                      androidMode={"calendar"}
                      placeHolderText={"Select Date of Birth"}
                      textStyle={{ color: "black" }}
                      placeHolderTextStyle={{ color: "#9B9B9B" }}
                      onDateChange={setDate}
                      disabled={false}
                      />
                    <MyAppText>
                    {chosenDate.toString().substr(0, 16)}
                  </MyAppText>
                  </Content>
                  <ProfileInput editable= {false} value= {email} width= "100%" keyboardType= "email-address" label= "Email Address" />
                  <View style= {styles.flexContainer}>
                    <ProfileInput onChangeText = {(value) => setGenotype(value)}  value= {genoType} width= "45%" keyboardType= "default" label= "Gentotype" />
                    <ProfileInput placeholder= "0+"  onChangeText = {(value) => setBloodGroup(value)} value= {bloodGroup} width= "45%" keyboardType= "default" label= "Blood Group" />
                    </View>
                    <View style= {styles.flexContainer}>
                    <ProfileInput onChangeText = {(value) => setPhone(value)}  value= {phone} width= "45%" keyboardType= "numeric" label= "Phone Number" />
                    <ProfileInput  onChangeText = {(value) => setLocation(value)} value= {location} width= "45%" keyboardType= "default" label= "Location" />
                    </View>
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
      fontFamily: 'HammersmithOne-Regular',
      opacity: 0.2
    },
    dateContainer: {
      // margin: 8,
      marginVertical: 8,
      borderBottomColor: 'black',
      borderBottomWidth: 1
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

export default errorHandler(Personal, axios);
