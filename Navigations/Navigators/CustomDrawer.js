import React, { useState } from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';

import {  StyleSheet, View,Platform,AsyncStorage, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../DrawerNav';
import Logo from '../../assets/sliders/images/logo.svg'
import MyAppText from '../../Components/MyAppText';

    const CustomDrawerContent = (props) => {
    const { signOut} = React.useContext(AuthContext);
    const [fontColor, setColor] = useState('white');
    const [sub, setSub] = useState('');
    const [user, setHmoUser] = useState('');

    const color = AsyncStorage.getItem('color').then(
      res => {
       setColor(res)
      }
    ).catch(err => console.log(err));

    const subscript = AsyncStorage.getItem('subscript').then(
      res => {
        setSub(res)
      }
    ).catch(err => console.log(err));

    const hmo_user = AsyncStorage.getItem('hmo_user').then(
      res => {
        setHmoUser(res);
      }
    ).catch(err => console.log(err));

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
        color: fontColor,

      },
      imageHeight: {
        width: '80%',
        height: 40
      },

  })
    return (
        <DrawerContentScrollView {...props}>
                <View style={{...styles.container, minHeight: 140,alignItems: 'center', justifyContent: 'center'}}>
                <Logo width= {150} height= {80} />
                <View>
                  {user == '0' ? 
               (<TouchableOpacity style= {styles.btnStyle}>
                <MyAppText style= {styles.colorText}>
                  {sub}
                </MyAppText>
              </TouchableOpacity>) :
              (<TouchableOpacity 
              onPress= {() => props.navigation.navigate('ManagePlan')}
              style= {styles.btnStyle}>
                <MyAppText style= {styles.colorText}>
                  {sub}
                </MyAppText>
              </TouchableOpacity>)  
                }
                </View>
                {user == '0' ? null : 
                    <MyAppText onPress= {() => props.navigation.navigate('ManagePlan')}>Manage Your Subscriptions</MyAppText>
                }
              
                  {/* <Text style={{fontSize: 32}}>LO</Text> */}
                  </View>
            <DrawerItemList {...props} />
         
                <View style={{...styles.containerHeight, minHeight: 140}}>
              <DrawerItem
              icon= {({color, size}) => (
                <Icon  name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
                color= "#9B9B9B"
                size= {22}
                />
              )}
              label="Log Out"
              labelStyle={styles.textColor2}
              
              
            
              
              onPress={() => signOut(props)}
            />
                 
                  </View>
          </DrawerContentScrollView>


    );
  }


  export default CustomDrawerContent;