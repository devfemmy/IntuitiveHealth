import React, {useState} from 'react';
import { View, StyleSheet,Alert, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import VitalInput from '../../../Components/VitalInput';
import InnerBtn from '../../../Components/InnerBtn';
import axios from '../../../axios-req';

const InputVitals = () => {
    const [pulse, setPulse] = useState('');
    const [temperature, setTemp] = useState('');
    const [pressure, setPressure] = useState('');
    const [respiratory, setResprate] = useState('');
    const [numerator, setNumerator] = useState('');
    const [denominator, setDenominator] = useState('');
    const [indicator, setIndicator] = useState('');
    const [tempIndicator, setTempIndicator] = useState('');
    const [PressureIndicator, setPressureIndicator] = useState('');
    const [color, setColor] = useState('white')
    const [color2, setColor2] = useState('white')
    const [color3, setColor3] = useState('white');
    const [loading, setLoading] = useState(false)

    const setPulseFunc = (value) => {
        setPulse(value)
      const pulseRate = parseInt(value);
      if (pulseRate >= 60 && pulseRate <= 100) {
          setIndicator('Normal')
          setColor('#58C315')
      } else if (pulseRate < 60) {
        setColor('#E6C300');
        setIndicator('Low');
      } else if (pulseRate > 100) {
          setColor('#D30C0C')
         setIndicator('High')
      } else {
          setIndicator(null)
      }
    }
    const setResFunc = (value) => {
        setResprate(value)
      const pulseRate = parseInt(value);
      if (pulseRate >= 60 && pulseRate <= 100) {
          setIndicator('Normal')
          setColor('#58C315')
      } else if (pulseRate < 60) {
        setColor('#E6C300');
        setIndicator('Low');
      } else if (pulseRate > 100) {
          setColor('#D30C0C')
         setIndicator('High')
      } else {
          setIndicator(null)
      }
    }

    const setPressFunc = (value) => {
        setPulse(value)
      const pulseRate = parseInt(value);
      if (pulseRate >= 60 && pulseRate <= 100) {
          setIndicator('Normal')
          setColor('#58C315')
      } else if (pulseRate < 60) {
        setColor('#E6C300');
        setIndicator('Low');
      } else if (pulseRate > 100) {
          setColor('#D30C0C')
         setIndicator('High')
      } else {
          setIndicator(null)
      }
    }
    const calculatePressure = (value) => {
      setDenominator(value)
      const a = parseInt(numerator);
      const b = parseInt(value);
      if (a < 120 && b < 80 ) {
       setPressureIndicator('Normal')
       setColor3('green')
      }else if ((a >= 120 && a <= 129) && (b < 80)) {
        setPressureIndicator('Elevated')
        setColor3('yellow')
      } else if ((a >= 130 && a <= 139) || (b >= 80 && b <= 89)) {
        setPressureIndicator('High BP')
        setColor3('orange')
      }else if ((a >= 140) || (b >= 90)) {
        setPressureIndicator('Very High BP')
        setColor3('red')
      }else if (a >= 180 || b >= 120) {
        setPressureIndicator('Crisis')
        setColor3('red')
      }
      
    }
    const setTempFunc = (value) => {
       setTemp(value)
      const tempRate = parseFloat(value);
      if (tempRate >= 36.5 && tempRate <= 37.2) {
        setTempIndicator('Normal')
          setColor2('#58C315')
      } else if (tempRate < 36.5) {
        setColor2('#E6C300');
        setTempIndicator('Low');
      } else if (tempRate > 37.2) {
          setColor2('#D30C0C')
          setTempIndicator('High')
      } else {
        setTempIndicator(null)
      }
    }
    const saveVitals = () => {
      if (respiratory === '' || pulse === '' 
       || temperature === '' || numerator === '' || denominator === '') {
        alert('Please fill all input fields')
      } else {
        setLoading(true)
        const id = AsyncStorage.getItem('Mytoken').then(
          res => {
              const data = {
                pulse: pulse,
                respiratory: respiratory,
                temperature: temperature,
                blood_pressure_num: numerator,
                blood_pressure_denum: denominator
              }
              axios.post('vitals/create', data, {headers: {Authorization: res}})
              .then(
                  res => {
                    setLoading(false)
                      console.log("vitals", res.data)
                      const messsage = `${res.data.message}, Your Vitals have been saved`;
                      Alert.alert(
                        'Success',
                        messsage,
                        [
                          {text: 'OK'},
                        ],
                        { cancelable: false }
                      )
                     
                  }
              )
              .catch(err => {
                console.log(err.response)
                setLoading(false)
                  const code = err.response.status;
                  const message = err.response.message;
                  if (code === 401) {
                      Alert.alert(
                          'Error!',
                          'Expired Token',
                          [
                            {text: 'OK', onPress: () => signOut()},
                          ],
                          { cancelable: false }
                        )
                    
                  } else if (code === 400) {
                    // setLoading(false)
                    console.log(err)
                      Alert.alert(
                          message,
                          'Please Try Again',
                          [
                            {text: 'OK'},
                          ],
                          { cancelable: false }
                        )
                  }
  
                    
                    console.log(err.response.status)
  
              })
          }
      )
      .catch( err => {console.log(err)}) 
      }

    }
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.vitalContainer}>
                <VitalInput
                value= {pulse}
                onChangeText= {(value)=> setPulseFunc(value)}
                keyboardType= "numeric"
                color= {color} 
                indicator= {indicator} label= "Pulse Rate" />
                <VitalInput
                onChangeText= {(value)=> setResprate(value)}
                keyboardType= "numeric"
                // color= {color} 
                // indicator= {indicator} 
                label= "Respiratory Rate" />
                <View style= {styles.flexedContainer}>
                <VitalInput
                width= "50%"
                indicator= "/"
                onChangeText= {(value)=> setNumerator(value)}
                keyboardType= "numeric"
                placeholder= "mm"
                // color= {color} 
                // indicator= {indicator} 
                label= "Blood Pressure(mm/Hg)" />
                  <VitalInput
                  width= "50%"
                onChangeText= {(value)=> calculatePressure(value)}
                keyboardType= "numeric"
                placeholder= "Hg"
                size= {30}
                color2= {color3}
                indicator2= {PressureIndicator} 
                label= " " />
                </View>
                <VitalInput
                 onChangeText= {(value)=> setTempFunc(value)}
                keyboardType= "numeric"
                color= {color2} 
                indicator= {tempIndicator} label= "Temperature" />
                <View style= {styles.btnContainer}>
                  {loading ? (<ActivityIndicator size= "large" color= "#6C0BA9" />) :                         <InnerBtn 
                        onPress= {saveVitals}
                        bg= "#6C0BA9"
                        color= "white"
                        text= "Save" />}

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    vitalContainer: {
        margin: 20
    },
    btnContainer: {
        marginTop: 30
    },
    flexedContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
});

export default InputVitals;