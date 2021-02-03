import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator,AsyncStorage } from 'react-native';
import MyDoctorsCard from '../../Components/MyDoctorsCard';
import axios from '../../axios-req';

const MyDoctors = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('my/doctors', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        const doctors = res.data.data;
                        // console.log('doctors', doctors)
                        setDoctors(doctors)
                       
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
            <View>
                {doctors.map(
                    (doctor, index) => {
                        const doctor_id = parseInt(doctor.id)
                        return (
                            <MyDoctorsCard
                            key= {index}
                            image= {{uri: doctor.image}}
                            experience = {`${doctor.experience} years experience`}
                            pressed= {()=> props.navigation.navigate('Slot', {doctor_id: doctor_id, group_id:1 })}
                            language= {doctor.qualification}
                            section= {doctor.specialty} 
                            name= {`${doctor.title} ${doctor.name} ${doctor.last_name} `} />
                        )
                    }
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    }
});

export default MyDoctors