import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import HomeScreen from '../../Screens/HomePage';
import Notification from '../../Screens/Profile/Notification';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Profilepage from '../../Screens/Profile/Profile';
import ProfileButton from '../../Components/ProfileBtn';
import HelpCenter from '../../Screens/Settings/settings';
import Personal from '../../Screens/Profile/Personal';
import CheckBmi from '../../Screens/Profile/CheckBmi';
import LifeStyle from '../../Screens/Profile/LifeStyle';
import BuyPlan from '../../Screens/BuyPlan';
import PaymentPage from '../../Screens/PaymentPage';


const Stack = createStackNavigator();

const ProfileNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Profile" component={Profilepage}
          options={{ title: 'Profile', headerStyle: {
              
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
          <Stack.Screen name="Help" component={HelpCenter}
          options={{ title: 'Help', headerStyle: {
              
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
          <Stack.Screen name="Personal" component={Personal}
          options={{ title: 'Personal', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Bmi" component={CheckBmi}
          options={{ title: 'Body Mass Index', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
                    <Stack.Screen name="Selfpay" component={PaymentPage}
          options={{ title: 'Self Pay', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? '#51087E' : '#51087E',

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
    
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Buyplan" component={BuyPlan}
          options={{ title: 'Buy Plan', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? '#51087E' : '#51087E',

          },
          headerTitleStyle: {
            fontFamily: 'HammersmithOne-Regular',
            fontSize: 20
          },
    
          headerTintColor: Platform.OS === 'android' ? 'white' : 'white'
        }}
          />
          <Stack.Screen name="Lifestyle" component={LifeStyle}
          options={{ title: 'Life Style', headerStyle: {
              
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


export default ProfileNavigator;