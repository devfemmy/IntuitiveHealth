import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView,Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import InnerBtn from '../../Components/InnerBtn';
import ProfileInput from '../../Components/ProfileInput';
import MyAppText from '../../Components/MyAppText';
import VitalInput from '../../Components/VitalInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from '../../axios-req';

const CheckBmi = (props) => {
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
    const [bmiStatus, setStatus] = useState('');
    const [colorCode, setColorCode] = useState('white');
    const [borderCode, setBorderCode] = useState('white');
    const [textColor, setTextColor] = useState('white');
    const [result, setResult] = useState(true)
  
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
        //   backgroundColor: '#D30C0C0B',
          backgroundColor: colorCode,
          borderWidth: 1,
          borderColor: borderCode,
        //   borderColor: '#E6C300',
          width: 150,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          height: 35
        },
        btnTextStyle: {
          color: textColor
        }
    });
    useEffect(() => {
      const id = AsyncStorage.getItem('Mytoken').then(
          res => {
             console.log('synch', res)
              axios.get('details', {headers: {Authorization: res}})
              .then(
                  res => {
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
                      showLoaded(true)
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
    const calculateBmi = () => {
        const intergerHeight = parseInt(height);
        const intergerWeight = parseInt(weight);
        const heightSquare = intergerHeight * intergerHeight;
        const myBmi = ((intergerWeight/heightSquare) * 10000).toFixed(1)
        setBmi(myBmi);
        const floatedBmi = parseFloat(myBmi)
        if (floatedBmi < 18.5) {
            setStatus('UNDER WEIGHT');
            setBorderCode('#E6C300');
            setColorCode('#D30C0C0B');
            setTextColor('#E6C300')
        }else if (floatedBmi >=25 && floatedBmi <=29.9  ) {
            setStatus('OVER WEIGHT');
            setBorderCode('#D30C0C');
            setColorCode('#D30C0C0B');
            setTextColor('#D30C0C')
        }else if (floatedBmi >= 18.5 && floatedBmi <= 24.9) {
            setStatus('NORMAL');
            setBorderCode('#58C315');
            setColorCode('#58C3151A');
            setTextColor('#58C315')
        } else {
          setStatus('OBESITY');
          setBorderCode('white');
          setColorCode('black');
          setTextColor('white')
        }
        setResult(false)
    }
    const  saveBmi = () => {
        setShowBtn(false)
       const id = AsyncStorage.getItem('Mytoken').then(
           res => {
               const data = {
                   height:  height/30.48,
                   weight: weight,
                   bmi: bmi
               }
               console.log("data", data)
               axios.post('bmi/create', data, {headers: {Authorization: res}})
               .then(
                   res => {  
                      console.log(res)
                       const message = res.data.message; 
                       alert(message);
                       setShowBtn(true)
                   }
               )
               .catch(err => {
                console.log("error", err.response)
                setShowBtn(true)
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
    return (
        <ScrollView style= {styles.container}>
    <View style={[styles.scene, { backgroundColor: '#F7F7FA', padding: 20 }]}>
        <View style= {styles.profileCont}>
              <MyAppText style= {styles.bmiText}>
              BMI (Body Mass Index)
              </MyAppText>
              <VitalInput value= {height} onChangeText= {(value) => setHeight(value) }  indicator= "Cm" keyboardType= "number-pad" label= "Height" />
              <VitalInput value= {weight} onChangeText = {(value) => setWeight(value) } indicator= "Kg" keyboardType= "number-pad" label= "Weight" />
              <InnerBtn onPress= {calculateBmi} text= "Calculate BMI" border= "#51087E" bg= "#fff" color= "#51087E" />
              {result ? null : (
                                <View style= {styles.resultContainer}>
                                <MyAppText style= {styles.bmiStyle}>
                                  Your BMI is:
                                </MyAppText>
                                <View style= {styles.flexContainer}>
                                  <MyAppText style= {styles.bmiStyle2}>
                                  {bmi}
                                  </MyAppText>
                                  <TouchableOpacity style= {styles.touchbtn}>
                                    <MyAppText style= {styles.btnTextStyle}>
                                        {bmiStatus}
                                    </MyAppText>
                                  </TouchableOpacity>
                                </View>
                                {showBtn ?   <InnerBtn onPress= {saveBmi} text= "Save" color= "#fff" bg= "#51087E" /> : <ActivityIndicator size= "large" color= "#000075"/>}
                          </View>
                         
              ) }

        </View>
        </View>
        </ScrollView>
    )
}


export default CheckBmi;
