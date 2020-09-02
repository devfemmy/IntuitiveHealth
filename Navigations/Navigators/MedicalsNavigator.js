import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image } from 'react-native';
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
import MyDoctors from '../../Screens/Records/MyDoctors';
import MedicalRecords from '../../Screens/Records/Medicals/MedicalRecords';
import MedicalHistory from '../../Screens/Records/Medicals/MedicalHistory';
import MedicalHistoryDetails from '../../Screens/Records/Medicals/MedicalHistoryDetails';
import DoctorsNote from '../../Screens/Records/Medicals/DoctorsNote';
import Medications from '../../Screens/Records/Medicals/Medications';
import DoctorsVitals from '../../Screens/Records/Medicals/DoctorVitals';
import ViewDocument from '../../Screens/Records/Medicals/ViewDocument';
import UploadDocument from '../../Screens/Records/Document/UploadDocument';


const Stack = createStackNavigator();

const MedicalsNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Medicals" component={MedicalRecords}
          options={{ title: 'Medical Records', headerStyle: {
              
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
          <Stack.Screen name="History" component={MedicalHistory}
          options={{ title: 'Medical History', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />  
          <Stack.Screen name="HistoryDetails" component={MedicalHistoryDetails}
          options={{ title: 'Medical History Details', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />   
          <Stack.Screen name="DoctorsNote" component={DoctorsNote}
          options={{ title: 'Doctors Note', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />  
          <Stack.Screen name="Medications" component={Medications}
          options={{ title: 'Medications', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />    
          <Stack.Screen name="DoctorsVitals" component={DoctorsVitals}
          options={{ title: 'Vitals', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />    
          <Stack.Screen name="Document" component={ViewDocument}
          options={{ title: 'Document', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />    
            <Stack.Screen name="Upload" component={UploadDocument}
          options={{ title: 'Document Upload', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />       
        </Stack.Navigator>
      </>
    )
}


export default MedicalsNavigator;