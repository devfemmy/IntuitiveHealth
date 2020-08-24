import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
//   import {Avatar, Title, Caption, Paragraph,
//   Drawer, TouchableRipple, Switch} from 'react-native-paper'

import { Text, StyleSheet, View, Image,Platform, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../DrawerNav';
import Logo from '../../assets/sliders/images/logo.svg'
import MyAppText from '../../Components/MyAppText';

  const CustomDrawerContent = (props) => {
    const { signOut} = React.useContext(AuthContext);
    return (
        <DrawerContentScrollView {...props}>
                <View style={{...styles.container, minHeight: 140,alignItems: 'center', justifyContent: 'center'}}>
                <Logo width= {150} height= {80} />
                <View>
                  <TouchableOpacity style= {styles.btnStyle}>
                    <MyAppText style= {styles.colorText}>PLANINUM PLAN</MyAppText>
                  </TouchableOpacity>
                </View>
                <MyAppText>Manage Your Subscriptions</MyAppText>
                  {/* <Text style={{fontSize: 32}}>LO</Text> */}
                  </View>
            <DrawerItemList {...props} />
         
                {/* <View style={{...styles.containerHeight, minHeight: 140}}>
                <DrawerItem
              icon= {({color, size}) => (
                <Icon  name={Platform.OS === 'android' ? 'md-help' : 'ios-help'}
                color= "#9B9B9B"
                size= {22}
                />
              )}
              label="Help Center"
              labelStyle={styles.textColor2}
              
              
            
              
              onPress={() => signOut(props)}
            />
              <DrawerItem
              icon= {({color, size}) => (
                <Icon  name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
                color= "#9B9B9B"
                size= {22}
                />
              )}
              label="Settings"
              labelStyle={styles.textColor2}
              
              
            
              
              onPress={() => signOut(props)}
            />
                 
                  </View> */}
          </DrawerContentScrollView>


    );
  }
  const styles = StyleSheet.create({
      textColor : {
          color: 'black',
          fontSize: 18
      },
      textColor2 : {
        color: 'black',
        fontSize: 16
    },
      container: {
        borderBottomWidth: 1,
        borderBottomColor: '#F7F7FA',
        marginBottom: 10
      },
      containerHeight: {
        borderTopWidth: 3,
        borderTopColor: '#F7F7FA',
        marginTop: 15,
      },
      btnStyle: {
        color: '#6C0BA9',
        backgroundColor: '#F7EAFF',
        height: 30,
        minWidth: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#6C0BA9',
        borderRadius: 5
      },
      colorText: {
        color: '#6C0BA9',

      },
      imageHeight: {
        width: '80%',
        height: 40
      },

  })

  export default CustomDrawerContent;