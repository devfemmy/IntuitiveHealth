import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import ProfileButton from '../../Components/ProfileBtn';
import Faq from '../../Screens/Faq';


const Stack = createStackNavigator();

const ConfigureNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Faq" component={Faq}
          options={{ title: 'Faq', headerStyle: {
              
              backgroundColor: '#51087E',
          
              
              

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


export default ConfigureNavigator;