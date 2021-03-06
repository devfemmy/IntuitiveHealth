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
import About from '../../Screens/Settings/About/About';
import Terms from '../../Screens/Settings/About/Terms';
import ChangePassword from '../../Screens/Settings/ChangePassword/ChangePassword';
import HelpPage from '../../Screens/Profile/HelpCenter/HelpPage';
import Faq from '../../Screens/Faq';
import ContactUs from '../../Screens/Contact';


const Stack = createStackNavigator();

const SettingsNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Settings" component={SettingPage}
          options={{ title: 'Explore Settings', headerStyle: {
              
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
          <Stack.Screen name="About" component={About}
          options={{ title: 'About Conduit Health', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Terms" component={Terms}
          options={{ title: 'Terms and Privacy Policy', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="ChangePassword" component={ChangePassword}
          options={{ title: 'Change Password', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Faq" component={HelpPage}
          options={{ title: 'Help Center', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          // headerLeft: () => (
          //   <HeaderButtons HeaderButtonComponent= {ProfileButton}>
          //     <Item title= "Menu"
          //       iconName= "ios-menu"
          //       onPress= {() => {props.navigation.openDrawer();}} />
          //   </HeaderButtons>

          // ), 
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Faqs" component={Faq}
          options={{ title: 'FAQ', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          }, 
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Contact" component={ContactUs}
          options={{ title: 'Contact Us', headerStyle: {
              
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


export default SettingsNavigator;