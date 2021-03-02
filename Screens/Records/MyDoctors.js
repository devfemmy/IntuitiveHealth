import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator,AsyncStorage } from 'react-native';
import MyDoctorsCard from '../../Components/MyDoctorsCard';
import axios from '../../axios-req';
import errorHandler from '../ErrorHandler/errorHandler';

const MyDoctors = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('user/my/doctors', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        const doctors = res.data.data;
                        // console.log('doctors', doctors)
                        setDoctors(doctors)
                       
                    }
                )
                .catch(err => {
                    setLoading(false);
                    setError(true)                      
                    
    
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

export default errorHandler(MyDoctors, axios)