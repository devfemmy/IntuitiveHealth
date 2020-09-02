import React, {useEffect, useState}from 'react';
import { View, StyleSheet,AsyncStorage,ActivityIndicator, ScrollView, Text } from 'react-native';
import MyAppText from '../../Components/MyAppText';
import AppointmentCard from '../../Components/AppointmentCard';
import InnerBtn from '../../Components/InnerBtn';
import axios from '../../axios-req';

const AppointmentPage = (props) => {
    const [appointments, setAppointment] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
               console.log('home', res)
                axios.get('my/slots', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log("home", res.data)
                        const appointments = res.data.data;
                        setAppointment(appointments);
                        // const profile = res.data.data;
                        // const lastname = profile.last_name;
                        // const firstname = profile.name;
                        // const email = profile.email;
                        // const occupation = profile.occupation;
                        // const location = profile.location;
                        // setFirstname(firstname);
                        // setLastname(lastname);
                        // setEmail(email);
                        // setOccupation(occupation)
                        // setLocation(location)
                       
                    }
                )
                .catch(err => {
                    setLoading(false)
                    const code = err.response.status;
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [
                              {text: 'OK', onPress: () => signOut()},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                        showLoaded(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => setShowBtn(true)},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                      console.log(err.response.status)
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
        
    
      }, []);
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.cardContainer}>
                {appointments.map(
                    (appointment, index) => {
                        const status = parseInt(appointment.status);
                        if (status === 0) {
                            return (
                                <View key= {index}>
                                      <AppointmentCard 
                                      onPress= {()=> props.navigation.navigate('Details')}
                                      doctor= {`${appointment.doctor_name} ${appointment.doctor_last_name}`} 
                                       appdate= {appointment.appointment_start} image= {appointment.image}
                                      color= "#D30C0C" status= {appointment.status_name} appid= {appointment.my_id} />
                                </View>
                            )
                        }else if (status === 1) {
                            return (
                                <View key= {index}>
                                      <AppointmentCard 
                                      onPress= {()=> props.navigation.navigate('Details')}
                                      doctor= {`${appointment.doctor_name} ${appointment.doctor_last_name}`} 
                                       appdate= {appointment.appointment_start} image= {appointment.image}
                                      color= "#464646" status= {appointment.status_name} appid= {appointment.my_id} />
                                </View>
                            )
                        }else if (status === 2) {
                            return (
                                <View key= {index}>
                                      <AppointmentCard

                                      onPress= {()=> props.navigation.navigate('Details')}
                                      appdate= {appointment.appointment_start}
                                       doctor= {`${appointment.doctor_name} ${appointment.doctor_last_name}`} 
                                       appdate= {appointment.appointment_start} image= {appointment.image}
                                       color= "#FC7E00" status= {appointment.status_name} appid= {appointment.my_id} />
                                </View>
                            )
                        }else if (status === 3) {
                            return (
                                <View key= {index}>
                                      <AppointmentCard 
                                      onPress= {()=> props.navigation.navigate('Details')}
                                      doctor= {`${appointment.doctor_name} ${appointment.doctor_last_name}`} 
                                       appdate= {appointment.appointment_start} image= {appointment.image}
                                      color= "#58C315" status= {appointment.status_name} appid= {appointment.my_id} />
                                </View>
                            )
                        }else if (status === 4) {
                            return (
                                <View key= {index}>
                                      <AppointmentCard 
                                      onPress= {()=> props.navigation.navigate('Details')}
                                      doctor= {`${appointment.doctor_name} ${appointment.doctor_last_name}`} 
                                       appdate= {appointment.appointment_start} image= {appointment.image}
                                      color= "#51087E" status= {appointment.status_name} appid= {appointment.my_id} />
                                </View>
                            )
                        }
                      
                    }
                )}
                {/* <AppointmentCard color= "#FC7E00" status= "Scheduled" appid= {236578} />
                <AppointmentCard color= "#58C315" status= "Completed" appid= {236578} />
                <AppointmentCard color= "#58C315" status= "Completed" appid= {236578} />
                <AppointmentCard color= "#D30C0C" status= "Cancelled" appid= {236578} /> */}
                <View style= {styles.btnContainer}>
                    <InnerBtn onPress= {() => props.navigation.navigate('Practise')} color= "white" bg= "#51087E" text= "Start a new conversation" />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1
    },
    cardContainer: {
        margin: 20
    }
});

export default AppointmentPage