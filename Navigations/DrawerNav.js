import * as React from 'react';
import {StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// import HomeNavigator from './Navigators/HomeNavigator';
// import {Ionicons} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginNavigator from './Navigators/LoginNavigator';
import HomeNavigator from './Navigators/HomeNavigator';
import CustomDrawerContent from './Navigators/CustomDrawer';
import ProfileNavigator from './Navigators/ProfileNavigator';
import ConfigureNavigator from './Navigators/ConfigureNavigator';
import SettingsNavigator from './Navigators/SettingNavigator';
import VideoNavigator from './Navigators/VideoNavigator';
import AppointmentNavigator from './Navigators/AppointmentNavigator';
import MyDoctorNavigator from './Navigators/MyDoctorNavigator';
import MedicalsNavigator from './Navigators/MedicalsNavigator';
import VitalsNavigator from './Navigators/VitalsNavigator';



export const AuthContext = React.createContext();
const Drawer = createDrawerNavigator();
const DrawerNav = (props) => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
      );
    
      React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
        console.log('USER', userToken)
          try {
            userToken = await AsyncStorage.getItem('userToken');
            console.log('what is', userToken)
            // loggedIn = await AsyncStorage.getItem('LoggedIn');
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
    
        bootstrapAsync();
      }, []);
    
      const authContext = React.useMemo(
        () => ({
          signIn: async data => {
                dispatch({ type: 'SIGN_IN', token: data });
           
       
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token
            await AsyncStorage.setItem('LoggedIn', '0');
            const login = AsyncStorage.getItem('LoggedIn')
            console.log('33', login)
    
           
          },
          signOut: async (data) => {
            await AsyncStorage.setItem('LoggedIn', '1');
            const logout = AsyncStorage.getItem('LoggedIn')
          dispatch({ type: 'SIGN_OUT' });
          data.navigation.closeDrawer()
          
        },
          signUp: async data => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token
    
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
        }),
        []
      );
      console.log('usertoken7', state.userToken)
   
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
            <Drawer.Navigator
           drawerContent={props => <CustomDrawerContent {...props} />}
            drawerContentOptions= {
                {
                    activeTintColor: '#1F1F1F',
                    labelStyle: {
                        color: '#1F1F1F',
                        fontSize: 16,
                        fontFamily: 'HammersmithOne-Regular',
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                      fontFamily: 'HammersmithOne-Regular',
                    }
                }
            }
            drawerStyle= {{
                backgroundColor: 'white',
                paddingVertical: 10
            }} 
            drawerType= 'slide' initialRouteName="Home">
                        {state.userToken == null ? (
          <Drawer.Screen name="Log In" component={LoginNavigator}
          />
        ) : (
          <>
         <Drawer.Screen name="Home" component={HomeNavigator} options= {{
                       drawerIcon: config => <Icon
                       size={22}
                       color= "#6C0BA9"
                       name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}></Icon>
                    }} />
                    <Drawer.Screen name="Profile" component={ProfileNavigator}
                     options= {{
                      drawerIcon: config => <Icon
                      size={22}
                      color= "#6C0BA9"
                      name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}></Icon>
                    }}
                    />
                    <Drawer.Screen name="Vitals" component={VitalsNavigator}
                     options= {{
                      drawerIcon: config => <Icon
                      size={22}
                      color= "#6C0BA9"
                      name={Platform.OS === 'android' ? 'md-archive' : 'ios-archive'}></Icon>
                    }}
                    />
                    <Drawer.Screen name="Video Consultation" component={VideoNavigator}
                     options= {{
                      drawerIcon: config => <Icon
                      size={22}
                      color= "#6C0BA9"
                      name={Platform.OS === 'android' ? 'md-videocam' : 'ios-videocam'}></Icon>
                    }}
                    />
                      <Drawer.Screen name="My Appointments" component= {AppointmentNavigator}
                     options= {{
                      drawerIcon: config => <Icon
                      size={22}
                      color= "#6C0BA9"
                      name={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}></Icon>
                    }}
                    />
                    <Drawer.Screen name="My Doctors" component= {MyDoctorNavigator}
                     options= {{
                      drawerIcon: config => <Icon
                      size={22}
                      color= "#6C0BA9"
                      name={Platform.OS === 'android' ? 'md-medical' : 'ios-medical'}></Icon>
                    }}
                    />
                      <Drawer.Screen name="Medical Records" component= {MedicalsNavigator}
                     options= {{
                      drawerIcon: config => <Icon
                      size={22}
                      color= "#6C0BA9"
                      name={Platform.OS === 'android' ? 'md-medkit' : 'ios-medkit'}></Icon>
                    }}
                    />
                    <Drawer.Screen name="Help Center" component={ConfigureNavigator}
                     options= {{
                      drawerIcon: config => <Icon
                      size={22}
                      color= "#9B9B9B"
                      name={Platform.OS === 'android' ? 'md-help' : 'ios-help'}></Icon>
                    }}
                    />
                    <Drawer.Screen name="Settings" component={SettingsNavigator}
                     options= {{
                      drawerIcon: config => <Icon
                      size={22}
                      color= "#9B9B9B"
                      name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}></Icon>
                    }}
                    />
                    {/* <Drawer.Screen name="Log Out" component={LoginPage} /> */}
          </>
        )}
        
                   
            </Drawer.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
const styles = StyleSheet.create({
    imageStyle: {
        width: 20,
        height: 20
    }
})

export default DrawerNav;