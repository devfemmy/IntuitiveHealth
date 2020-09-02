import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

const FormInput = (props) => {
  const styles = StyleSheet.create({

    inputStyle: {
      color: props.color,
      borderBottomColor: '#9B9B9B',
      fontFamily: 'HammersmithOne-Regular',
      borderBottomWidth: 1,
      padding: 10,
      marginVertical: 5,
      fontSize: 16
      
      
    }
  })
    return (
        <View>
        <TextInput style= {styles.inputStyle} 
            placeholder= {props.placeholder} 
            placeholderTextColor= {props.placeholderTextColor}
            selectionColor = {props.selectionColor}
            autoCorrect= {false}
            autoCapitalize= 'none'
            secureTextEntry = {props.secureTextEntry}
            onChangeText={props.onChangeText}
            defaultValue= {props.defaultValue}
            value={props.value} />
            
        </View>
    )
}





export default FormInput