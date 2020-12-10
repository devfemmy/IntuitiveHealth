import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const PickerInput = (props) => {
const pickerSelectStyles = StyleSheet.create({

  inputIOS: {
    
    color: 'black',
    opacity: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    margin: 0,
    height: 50,
    width: props.width,
    fontSize: 16,
    fontFamily: 'HammersmithOne-Regular',
    
  },
  inputAndroid: {
    color: 'black',
    opacity: 1,
    fontSize: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    margin: 0,
    height: 50,
    width: props.width,
    fontFamily: 'HammersmithOne-Regular',
  }
});
  return (
    <View>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            placeholder={{
              label: props.placeholder,
              value: null,
              color: 'black',
              opacity: 1
            }}
            onValueChange={(value) => console.log(value)}
            items={props.items}
          
        />

    </View>
  );
}



export default PickerInput;