import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image, Alert,AsyncStorage } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfileButton from '../../Components/ProfileBtn';
import Emergency from '../../Screens/Emergency/Emergency';
import EmergencyVoice from '../../Screens/Emergency/EmergencyVoice';
import VirtualCall from '../../Screens/Appointments/VirtualCall';
import VoiceCall from '../../Screens/Appointments/VoiceCall';
import WaitingRoom from '../../Screens/Emergency/WaitingRoom';
import EndCallIcon from '../../assets/sliders/images/end_call.svg';
import axios from 'axios';
import Ratings from '../../Screens/Appointments/RatingPage';
import AppointmentPage from '../../Screens/Appointments/MyAppointment';
import ChatRoom from '../../Screens/Media/VideoScreen/Chat/ChatRoom';



const Stack = createStackNavigator();


const EmergencyNavigator = (props) => {
//   const [history_id, setHistory_id] = useState('')
//   console.log('HISTORYIF', history_id)
//   const getToken = () => {
//     const history = AsyncStorage.getItem('history').then(
//       res => {
//         setHistory_id(res)
//         console.log('response_history', res)
//       }
//     ).catch(err => console.log(err));
//   }
//   useEffect(() => { 

//     const subscribe = props.navigation.addListener('focus', () => {
//         getToken()

//     });
//     const unsubscribe = props.navigation.addListener('blur', () => {
//       //  clearInterval(interval)
//     });

//     return unsubscribe, subscribe
// }, [props.navigation])



// const cancelMyAppointment = () => {
// const id = AsyncStorage.getItem('Mytoken').then(
//   res => {
//     const data = {
//       history_id: parseInt(history_id)
//     }
//     console.log('data to send', data)
//       axios.post('https://conduit.detechnovate.net/public/api/user/checkout/history',data, {headers: {Authorization: res}})
//       .then(
//           res => {
         
//             console.log(res)
          
              
             
//           }
//       )
//       .catch(err => {
//         console.log(err.response)
//       });

//   }
// )
// .catch( err => {console.log(err)});
// props.navigation.navigate('Review', {history_id: parseInt(history_id)})
// }

//   const checkOutsession = () => {
//     const history = AsyncStorage.getItem('history').then(
//       res => {
//         setHistory_id(parseInt(res))
//         console.log('response_history', res)
//       }
//     ).catch(err => console.log(err));
//     Alert.alert(
//       'Exit Page?',
//       'Are you sure you want to leave Room?',
//       [
//         { text: "Don't leave", style: 'cancel', onPress: () => {} },
//         {
//           text: 'Leave',
//           style: 'destructive',
//           // If the user confirmed, then we dispatch the action we blocked earlier
//           // This will continue the action that had triggered the removal of the screen
//           onPress: () => {
//                   // props.navigation.dispatch(e.data.action)
//                   cancelMyAppointment()
              

//           },
//         },
//       ]
//     );
//   }
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Emergency" component={Emergency}
          options={{ title: 'Instant Consultation', headerStyle: {
              
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
          <Stack.Screen name="EmergencyVoice" component={EmergencyVoice}
          options={{ title: 'Emergency Audio Consultation', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="WaitingRoom" component={WaitingRoom}
          options={{ title: 'Waiting Room', headerStyle: {
              
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
          // headerRight: () => (
          //   <TouchableOpacity style= {{marginRight: 10}} onPress= {checkOutsession}>
          //       <EndCallIcon width= {30} height= {30} />
          //   </TouchableOpacity>

          //   // <Button
          //   //   onPress={() => alert('This is a button!')}
          //   //   title="Info"
          //   //   color="red"
          //   // />
          // ),
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
          options={{ title: 'Audio Consultation', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
        <Stack.Screen name="Chat Room" component={ChatRoom}
          options={{ title: 'Chat Room', headerStyle: {
              
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


export default EmergencyNavigator;