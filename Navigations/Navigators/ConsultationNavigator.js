import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button,TouchableOpacity, Image, Alert,AsyncStorage  } from 'react-native';
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
import ShowActiveSessions from '../../Screens/Media/VideoScreen/ShowSessions';
import EndCallIcon from '../../assets/sliders/images/end_call.svg';
import VirtualCall from '../../Screens/Appointments/VirtualCall';
import VoiceCall from '../../Screens/Appointments/VoiceCall';
import Ratings from '../../Screens/Appointments/RatingPage';
import axios from 'axios';



const Stack = createStackNavigator();


const ConsultationNavigator = (props) => {
      const [history_id, setHistory_id] = useState('')
      
      useEffect(() => {
        const history = AsyncStorage.getItem('history').then(
          res => {
            setHistory_id(res)
            console.log('response_history', res)
          }
        ).catch(err => console.log(err));
      }, []);



  const cancelMyAppointment = () => {
    const id = AsyncStorage.getItem('Mytoken').then(
      res => {
        const data = {
          history_id: parseInt(history_id)
        }
        console.log('data to send', data)
          axios.post('https://conduit.detechnovate.net/public/api/user/checkout/history',data, {headers: {Authorization: res}})
          .then(
              res => {
             
                console.log(res)
              
                  
                 
              }
          )
          .catch(err => {
            console.log(err.response)
          });
  
      }
  )
  .catch( err => {console.log(err)});
  props.navigation.navigate('Review', {history_id: parseInt(history_id)})
  }

  const checkOutsession = () => {
    const history = AsyncStorage.getItem('history').then(
      res => {
        setHistory_id(res)
        console.log('response_history', res)
      }
    ).catch(err => console.log(err));
    Alert.alert(
      'Exit Page?',
      'Are you sure you want to leave Room?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => {} },
        {
          text: 'Leave',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => {
                  // props.navigation.dispatch(e.data.action)
                  cancelMyAppointment()
              

          },
        },
      ]
    );
  }
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Video" component={ShowActiveSessions}
          options={{ title: 'Consultations', headerStyle: {
              
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
            <Stack.Screen name="Active" component={VideoPage}
          options={{ title: 'Fetching Token', headerStyle: {
              
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
          headerRight: () => (
            <TouchableOpacity style= {{marginRight: 10}} onPress= {checkOutsession}>
                <EndCallIcon width= {30} height= {30} />
            </TouchableOpacity>

            // <Button
            //   onPress={() => alert('This is a button!')}
            //   title="Info"
            //   color="red"
            // />
          ),
          headerLeft: null,
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
        <Stack.Screen name="Practise" component={GeneralPractise}
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


export default ConsultationNavigator;