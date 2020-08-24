import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import ProfileButton from '../../Components/ProfileBtn';
import HelpCenter from '../../Screens/Settings/settings';
import VitalsPage from '../../Screens/Profile/Vitals/Vitals';
import InputVitals from '../../Screens/Profile/Vitals/InputVitals';


const Stack = createStackNavigator();

const VitalsNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Vitals" component={VitalsPage}
          options={{ title: 'Vitals', headerStyle: {
              
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
          <Stack.Screen name="Input" component={InputVitals}
          options={{ title: 'Input Vitals', headerStyle: {
              
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


export default VitalsNavigator;