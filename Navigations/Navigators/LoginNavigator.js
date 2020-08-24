import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button } from 'react-native';
// import {HeaderButtons, Item} from 'react-navigation-header-buttons'
// import CustomHeaderButton from '../../Components/HeaderButton';
// import ForgotPassword from '../../Screens/ForgotPassword';
// import LoginPage from '../../Screens/Login';
import LoginScreen from '../../Screens/LoginScreen';
import HomeScreen from '../../Screens/HomePage';
import ForgotPassword from '../../Screens/ForgotPassword';
import Faq from '../../Screens/Faq';
import WelcomeScreen from '../../Screens/WelcomeScreen';
import FlatListDemo from '../../Screens/HmoScreen';
import IntroPage from '../../Screens/IntroPage';

const Stack = createStackNavigator();

const LoginNavigator = (props) => {
    return (
        <>
        <Stack.Navigator screenOptions={{
                headerShown: true
            }}>
          {/* <Stack.Screen name="Welcome" component={WelcomeScreen}
          options={{ title: 'Conduit Telehealth', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? '#51087E' : '#51087E',

          },
    
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          /> */}
          <Stack.Screen name="Login" component={LoginScreen}
          options={{ title: 'Login', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
            

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
    
          headerTintColor: Platform.OS === 'android' ? '#51087E' : '#51087E'
        }}
          />
          <Stack.Screen name="Hmo" component={FlatListDemo}
          options={{ title: 'Find HMO', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? '#51087E' : '#51087E',

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
    
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
        <Stack.Screen name="ForgotPass" options={{ title: 'Forgot Password', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? '#51087E' : '#51087E',

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }} component={ForgotPassword} />
          <Stack.Screen name="Intro" options={{ title: 'Choose Login', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? '#51087E' : '#51087E',

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }} component={IntroPage} />
          <Stack.Screen name="Faq" options={{ title: 'FAQ', headerStyle: {
             backgroundColor: Platform.OS === 'android' ? '#51087E' : '#51087E',

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }} component={Faq} />
        </Stack.Navigator>
      </>
    )
}


export default LoginNavigator;