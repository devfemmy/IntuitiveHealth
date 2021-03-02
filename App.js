/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { Root } from "native-base";
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import WelcomeScreen from './Screens/WelcomeScreen';
import LoginScreen from './Screens/LoginScreen';
import HmoScreen from './Screens/HmoScreen';
import FlatListDemo from './Screens/HmoScreen';
import DrawerNav from './Navigations/DrawerNav';
import StackNav from './Navigations/StackNav';
import HomePage from './Screens/HomePage';
// import Toast from 'react-native-toast-message'

export default function App() {

  // const [fontLoaded, setFontLoaded] = useState(false);
  // if (!fontLoaded) {
  //   return <AppLoading 
  //   startAsync= {fetchFonts} 
  //   onFinish= {() => setFontLoaded(true)} />
  // }

  // const toastConfig = {
  //   'success': (internalState) => (
  //     <View style={{ height: 60, width: '80%', backgroundColor: '' }}>
  //       <Text>{internalState.text1}</Text>
  //     </View>  
  //   ),
  // }
  return (
    <>
    <Root>
    <DrawerNav />
    </Root>
     
  
 
     
   
   
    </>
  );

}
