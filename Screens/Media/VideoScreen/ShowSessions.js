import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator,AsyncStorage } from 'react-native';
import MyDoctorsCard from '../../../Components/MyDoctorsCard';
// import MyDoctorsCard from '../../Components/MyDoctorsCard';
import axios from '../../../axios-req';
import ProfileCard from '../../../Components/ProfileCard';
import MyAppText from '../../../Components/MyAppText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SlotIconText from '../../../Components/SlotIconText';
import Icon from 'react-native-vector-icons/Ionicons';



const ShowActiveSessions = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDoctor, showNoDoctor] = useState(false)

      const fetchActiveSessions = () => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('my/slots/sessions', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        const doctors = res.data;
                        const length = doctors.length;
                        if (length > 0) {
                            setDoctors(doctors);
                            showNoDoctor(false)
                        } else {
    //('my doctors', doctors);
                            showNoDoctor(true)
                        }
                       
                       
                       
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
    
                      
                    
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
      }
      useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchActiveSessions()
          });
  
        
        return unsubscribe;
      }, [props.navigation]);
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
    return (
        <ScrollView style= {styles.container}>
            {showDoctor ? <View>
                <MyAppText style= {styles.textStyle4}>No Active Sessions</MyAppText>
            </View>: 
            (
                <View>
                {doctors.map(
                    (doctor, index) => {
                        const patient_session = parseInt(doctor.patient_session)
                        return (
                            <ProfileCard key= {index}>
                                <View>
                                <View style= {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20}}>
                                    <View>
                                    <MyAppText style= {styles.textStyle}>Start Time:</MyAppText>
                                    <MyAppText>
                                    {doctor.appointment_start.slice(0, 16)}
                                    </MyAppText>
                                  
                                    </View>
                                    <View>
                                    <MyAppText style= {styles.textStyle2}>End Time:</MyAppText>
                                    <MyAppText style = {styles.textStyle3}>{doctor.appointment_end.slice(0, 16)}</MyAppText>
                                    </View>
                                    {/* <Icon2 width= {24} height= {24} /> */}
                                </View>

                                 <View style= {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginVertical: 15}}>
                                 <TouchableOpacity onPress= {() => props.navigation.navigate('Active', {patient_session: patient_session})}>
                                <SlotIconText color="#000000" icon= {<Icon
                                size={22}
                                color= "#6C0BA9"
                                name={Platform.OS === 'android' ? 'md-videocam' : 'ios-videocam'}></Icon>} text= {"Start Video Call"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress= {() => props.navigation.navigate('Voice')}>
                                <SlotIconText color="#000000" icon= {<Icon
                                size={22}
                                color= "#6C0BA9"
                                name={Platform.OS === 'android' ? 'md-call' : 'ios-call'}></Icon>} text= {"Start Voice Call"} />
                                </TouchableOpacity>
                                 </View>

                                </View>

                            </ProfileCard>
                        )
                    }
                )}
            </View>
            )
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 25
    },
    textStyle: {
        opacity: 0.5
    },
    textStyle2: {
        textAlign: 'right',
        opacity: 0.5
    },
    textStyle3: {
        textAlign: 'right'
    },
    textStyle4: {
        textAlign: 'center'
    }
});

export default ShowActiveSessions