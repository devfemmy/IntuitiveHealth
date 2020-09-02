import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import HomeScreen from '../../Screens/HomePage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Notification from '../../Screens/Profile/Notification';
import GeneralPractise from '../../Screens/Media/VideoScreen/GeneralPractise';
import TimeSlot from '../../Screens/Media/VideoScreen/TimeSlot';
import PatientDetails from '../../Screens/Media/VideoScreen/PatientDetails';


const Stack = createStackNavigator();

const HomeNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}
          options={{ title: 'Home', headerStyle: {
              
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerRight: () => (
            <TouchableOpacity onPress= {() => props.navigation.navigate('Notification')}>
              <Image 
              style= {{width:25, height: 25, marginRight: 20}}
              source= {require('./../../assets/sliders/images/mail.png')} />
            </TouchableOpacity>

            // <Button
            //   onPress={() => alert('This is a button!')}
            //   title="Info"
            //   color="red"
            // />
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent= {CustomHeaderButton}>
              <Item title= "Menu"
                iconName= "ios-menu"
                onPress= {() => {props.navigation.openDrawer();}} />
            </HeaderButtons>

            // <Button
            //   onPress={() => alert('This is a button!')}
            //   title="Info"
            //   color="red"
            // />
          ), 
          headerTintColor: Platform.OS === 'android' ? 'black' : 'black'
        }}
          />
          <Stack.Screen name="Notification" component={Notification}
          options={{ title: 'Notification', headerStyle: {
              
              backgroundColor: Platform.OS === 'android' ? '#51087E' : '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerRight: () => (
            <TouchableOpacity onPress= {() => console.log('pressed')}>
              <Image style= {{width: 25, height: 25, marginRight: 15}} source= {require('../../assets/sliders/images/refresh.png')} />
            </TouchableOpacity>

            // <Button
            //   onPress={() => alert('This is a button!')}
            //   title="Info"
            //   color="red"
            // />
          ), 
          // headerLeft: () => (
          //   <TouchableOpacity onPress= {() => props.navigation.goBack()}>
          //     <Image style= {{width: 35, height: 35, marginLeft: 10}} source= {require('../../assets/sliders/images/back.png')} />
          //   </TouchableOpacity>

    
          // ), 
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Practise" component={GeneralPractise}
          options={{ title: 'General Practise', headerStyle: {
              
              backgroundColor: '#51087E',
          
              },
              headerTitleStyle: {
                fontFamily: 'HammersmithOne-Regular',
                fontSize: 20
              },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />  
          <Stack.Screen name="Slot" component={TimeSlot}
          options={{ title: 'Select Time Slot', headerStyle: {
              
              backgroundColor: '#51087E',
          
              },
              headerTitleStyle: {
                fontFamily: 'HammersmithOne-Regular',
                fontSize: 18
              },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />    
        <Stack.Screen name="Patient" component={PatientDetails}
          options={{ title: 'Patient Details', headerStyle: {
              
              backgroundColor: '#51087E',
          
              },
              headerTitleStyle: {
                fontFamily: 'HammersmithOne-Regular',
                fontSize: 18
              },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />  
        </Stack.Navigator>
      </>
    )
}


export default HomeNavigator;