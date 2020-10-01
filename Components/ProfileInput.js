import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import MyAppText from './MyAppText'

const ProfileInput = (props) => {
  const styles = StyleSheet.create({
    container: {
      marginVertical: 8,
      width: props.width
    },
    inputStyle: {
      color: '#1F1F1F',
      borderBottomColor: '#1F1F1F',
      borderBottomWidth: 1,
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
        <TextInput style= {styles.inputStyle} 
            placeholder= {props.placeholder} 
            multiline={props.multiline}
            numberOfLines={props.lines}
            placeholderTextColor= {props.placeholderTextColor}
            selectionColor = 'black'
            editable= {props.editable}
            autoCorrect= {false}
            defaultValue= {props.defaultValue}
            keyboardType= {props.keyboardType}
            autoCapitalize= 'none'
            secureTextEntry = {props.secureTextEntry}
            onChangeText={props.onChangeText}
            value={props.value} />
            
        </View>
    )
}


export default ProfileInput