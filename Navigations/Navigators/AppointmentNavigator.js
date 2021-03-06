import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button,AsyncStorage,Alert, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import HomeScreen from '../../Screens/HomePage';
import Notification from '../../Screens/Profile/Notification';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Profilepage from '../../Screens/Profile/Profile';
import ProfileButton from '../../Components/ProfileBtn';
import HelpCenter from '../../Screens/Settings/settings';
import AppointmentPage from '../../Screens/Appointments/MyAppointment';
import AppointmentDetails from '../../Screens/Appointments/AppointmentDetails';
import VirtualCall from '../../Screens/Appointments/VirtualCall';
import VoiceCall from '../../Screens/Appointments/VoiceCall';
import Ratings from '../../Screens/Appointments/RatingPage';
import FindConsult from '../../Screens/Media/VideoScreen/FindConsult';




const Stack = createStackNavigator();


const AppointmentNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Appointment" component={AppointmentPage}
          options={{ title: 'My Appointments', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent= {ProfileButton}>
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
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Details" component={AppointmentDetails}
          options={{ title: 'Appointment Details', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Virtual" component={VirtualCall}
          options={{ title: 'Virtual Call', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerLeft: null,
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
        <Stack.Screen name="Voice" component={VoiceCall}
          options={{ title: 'Voice Call', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Review" component={Ratings}
          options={{ title: 'Send Review', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerLeft: null,
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Consult" component={FindConsult}
          options={{ title: 'Find and Consult', headerStyle: {
              
              backgroundColor: '#51087E',
          
              },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent= {ProfileButton}>
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
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          /> 
          
        </Stack.Navigator>
      </>
    )
}


export default AppointmentNavigator;