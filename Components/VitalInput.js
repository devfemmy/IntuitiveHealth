import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import MyAppText from './MyAppText'

const VitalInput = (props) => {
    const styles = StyleSheet.create({
        container: {
          marginVertical: 8
        },
        indicatorStyle: {
          color: props.color,
          textAlign: 'right'
        },
        indicatorContainer: {
          width: '20%',
          marginVertical: 1,
          padding: 5,
        },
        lowerContainer: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: '#1F1F1F',
          borderBottomWidth: 1,
        },
        textInputContainer: {
          width: '80%'
        },
        inputStyle: {
          color: '#1F1F1F',
        //   borderBottomColor: '#1F1F1F',
        //   borderBottomWidth: 1,
          paddingHorizontal: 5,
          fontSize: 16,
          fontFamily: 'HammersmithOne-Regular',
          fontWeight: 'bold',
          padding: 5,
          marginVertical: 1,
          
          
        },
        textStyle: {
            color: '#9B9B9B'
        }
      })
    return (
        <View style= {styles.container}>
        <MyAppText style= {styles.textStyle}>
            {props.label}
        </MyAppText>
        <View style= {styles.lowerContainer}>
        <View style= {styles.textInputContainer}>
            <TextInput style= {styles.inputStyle} 
                placeholder= {props.placeholder} 
                placeholderTextColor= {props.placeholderTextColor}
                selectionColor = 'black'
                autoCorrect= {false}
                defaultValue= {props.defaultValue}
                keyboardType= {props.keyboardType}
                autoCapitalize= 'none'
                secureTextEntry = {props.secureTextEntry}
                onChangeText={props.onChangeText}
                value={props.value} />
        </View>
            <View style= {styles.indicatorContainer}>
                <MyAppText style= {styles.indicatorStyle}>
                    {props.indicator}
                </MyAppText>
            </View>
          
        </View>
            
        </View>
    )
}


export default VitalInput