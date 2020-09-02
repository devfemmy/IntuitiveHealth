import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import ProfileButton from '../../Components/ProfileBtn';
import HelpCenter from '../../Screens/Settings/settings';
import VideoPage from '../../Screens/Media/VideoScreen/VideoPage';
import FindConsult from '../../Screens/Media/VideoScreen/FindConsult';
import GeneralPractise from '../../Screens/Media/VideoScreen/GeneralPractise';
import TimeSlot from '../../Screens/Media/VideoScreen/TimeSlot';
import PatientDetails from '../../Screens/Media/VideoScreen/PatientDetails';
import MentalHealth from '../../Screens/Media/VideoScreen/MentalHealth/MentalHealth';
import IntakeForm from '../../Screens/Media/VideoScreen/MentalHealth/IntakeForm';


const Stack = createStackNavigator();

const VideoNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Video" component={VideoPage}
          options={{ title: 'Video Consultations', headerStyle: {
              
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
            <Stack.Screen name="Consult" component={FindConsult}
          options={{ title: 'Find and Consult', headerStyle: {
              
              backgroundColor: '#51087E',
          
              },
              headerTitleStyle: {
                fontFamily: 'HammersmithOne-Regular',
                fontSize: 20
              },
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
       <Stack.Screen name="Mental" component={MentalHealth}
          options={{ title: 'Mental Health Specialist', headerStyle: {
              
              backgroundColor: '#51087E',
          
              },
              headerTitleStyle: {
                fontFamily: 'HammersmithOne-Regular',
                fontSize: 18
              },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />   
          <Stack.Screen name="IntakeForm" component={IntakeForm}
          options={{ title: 'Intake Form', headerStyle: {
              
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


export default VideoNavigator;