import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import ProfileButton from '../../Components/ProfileBtn';
import MedicalRecords from '../../Screens/Records/Medicals/MedicalRecords';
import MedicalHistory from '../../Screens/Records/Medicals/MedicalHistory';
import MedicalHistoryDetails from '../../Screens/Records/Medicals/MedicalHistoryDetails';
import DoctorsNote from '../../Screens/Records/Medicals/DoctorsNote';
import Medications from '../../Screens/Records/Medicals/Medications';
import DoctorsVitals from '../../Screens/Records/Medicals/DoctorVitals';
import ViewDocument from '../../Screens/Records/Medicals/ViewDocument';
import UploadDocument from '../../Screens/Records/Document/UploadDocument';
import ViewUploads from '../../Screens/Records/Document/ViewUpload';
import ViewList from '../../Screens/Records/Document/ViewList';
import ViewNotes from '../../Screens/Records/Medicals/Views/ViewNotes';
import ViewPrescription from '../../Screens/Records/Medicals/Views/ViewPres';
import ViewVitals from '../../Screens/Records/Medicals/Views/ViewVitals';
import SecondOpinion from '../../Screens/SecondOpinion/SecondOpinion';
import OpinionTitle from '../../Screens/SecondOpinion/SecondOpinionTitle';


const Stack = createStackNavigator();

const SecondOpinionNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="SecondOpinion" component={SecondOpinion}
          options={{ title: 'Second Opinion', headerStyle: {
              
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
          <Stack.Screen name="Title" component={OpinionTitle}
          options={{ title: 'Title', headerStyle: {
              
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
          <Stack.Screen name="ViewNotes" component={ViewNotes}
          options={{ title: 'Note Details', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          /> 
          <Stack.Screen name="ViewVitals" component={ViewVitals}
          options={{ title: 'Vitals Details', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />  
          <Stack.Screen name="ViewPrescription" component={ViewPrescription}
          options={{ title: 'Prescription Details', headerStyle: {
              
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
            <Stack.Screen name="ViewUpload" component={ViewUploads}
          options={{ title: 'View Uploaded Documents', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />  
          <Stack.Screen name="ViewList" component={ViewList}
                  options={
                    ({ route }) => ({ title: route.params.name, 
                      headerStyle: {
              
                        backgroundColor: '#51087E',
                    
                        },
                        headerTitleStyle: {
                          fontFamily: 'HammersmithOne-Regular',
                          fontSize: 20
                        },
                    headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
                    })
            
                }
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


export default SecondOpinionNavigator;