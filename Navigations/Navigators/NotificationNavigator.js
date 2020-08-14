import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import HomeScreen from '../../Screens/HomePage';
import Notification from '../../Screens/Profile/Notification';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Stack = createStackNavigator();

const NotificationNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Notification" component={Notification}
          options={{ title: 'Notification', headerStyle: {
              
              backgroundColor: Platform.OS === 'android' ? '#51087E' : '#51087E',
          
              
              

          },
          headerLeft: () => (
            <TouchableOpacity>
              <Image source= {require('../../assets/sliders/images/back.png')} />
            </TouchableOpacity>

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


export default NotificationNavigator;