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

const Stack = createStackNavigator();

const LoginNavigator = (props) => {
    return (
        <>
        <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
          <Stack.Screen name="Login" component={LoginScreen}
          options={{ title: 'Login', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
    
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
        <Stack.Screen name="ForgotPass" options={{ title: 'Forgot Password', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }} component={ForgotPassword} />
        </Stack.Navigator>
      </>
    )
}


export default LoginNavigator;