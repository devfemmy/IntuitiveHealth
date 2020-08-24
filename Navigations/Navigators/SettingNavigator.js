import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image, Settings } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import HomeScreen from '../../Screens/HomePage';
import Notification from '../../Screens/Profile/Notification';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Profilepage from '../../Screens/Profile/Profile';
import ProfileButton from '../../Components/ProfileBtn';
import SettingPage from '../../Screens/Settings/settings';


const Stack = createStackNavigator();

const SettingsNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Settings" component={SettingPage}
          options={{ title: 'Settings', headerStyle: {
              
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


export default SettingsNavigator;