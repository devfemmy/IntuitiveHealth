import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HelpCenter from '../Screens/Settings/settings';

const Stack = createStackNavigator();

function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Help" component={HelpCenter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;