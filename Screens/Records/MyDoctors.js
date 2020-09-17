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
                        const doctors = res.data
                        setDoctors(doctors);
                        // console.log("appointments", res.data)
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
    
                      
                    
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
        
    
      });
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
                        return (
                            <MyDoctorsCard
                            key= {index}
                            experience = {`${doctor.experience} years experience`}
                            pressed= {()=> props.navigation.navigate('Practise')}
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