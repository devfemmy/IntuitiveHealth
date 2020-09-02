import React, {useState} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import VitalInput from '../../../Components/VitalInput';
import InnerBtn from '../../../Components/InnerBtn';

const InputVitals = () => {
    const [pulse, setPulse] = useState('');
    const [temperature, setTemp] = useState('');
    const [pressure, setPressure] = useState('');
    const [respiratory, setResprate] = useState('');
    const [indicator, setIndicator] = useState('');
    const [tempIndicator, setTempIndicator] = useState('');
    const [color, setColor] = useState('white')
    const [color2, setColor2] = useState('white')

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
                // onChangeText= {(value)=> setResFunc(value)}
                keyboardType= "numeric"
                // color= {color} 
                // indicator= {indicator} 
                label= "Respiratory Rate" />
                <VitalInput
                // onChangeText= {(value)=> setPressFunc(value)}
                keyboardType= "numeric"
                // color= {color} 
                // indicator= {indicator} 
                label= "Blood Pressure" />
                <VitalInput
                 onChangeText= {(value)=> setTempFunc(value)}
                keyboardType= "numeric"
                color= {color2} 
                indicator= {tempIndicator} label= "Temperature" />
                <View style= {styles.btnContainer}>
                        <InnerBtn 
                        bg= "#6C0BA9"
                        color= "white"
                        text= "Save" />
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
    }
});

export default InputVitals;