import React, {useEffect, useState} from 'react';
import { View, StyleSheet,AsyncStorage,ActivityIndicator,Alert, TouchableOpacity,ScrollView } from 'react-native';
import DoctorCard from '../../../Components/DoctorCard';
import MyAppText from '../../../Components/MyAppText';
import ProfileCard from '../../../Components/ProfileCard';
import axios from '../../../axios-req'



const DoctorsVitals = (props) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('vitals/show', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log("notes,", res.data)
                        const notes = res.data.data
                        setNotes(notes)
                       
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
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK'},
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
            <View style= {styles.noteContainer}>
                        {notes.map((note, index) => {
                            const doctors_name = `${note.title} ${note.name} ${note.last_name}`
                            return (
                                <View key= {index}>
                            <TouchableOpacity onPress= {() => props.navigation.navigate('ViewVitals', {name: doctors_name, time: note.created_at.slice(11, 16), date: note.created_at, deno: note.blood_pressure_denum, num: note.blood_pressure_num, temperature: note.temperature, pulse: note.pulse, respiratory: note.respiratory}) }>
                                    <ProfileCard>
                                    <View style= {styles.textContainer}>
                                        <MyAppText style= {styles.label}>
                                            Date
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                       {note.created_at.slice(0, 10)}
                                        </MyAppText>
                                    </View>
                                    <View style= {styles.textContainer}>
                                        <MyAppText style= {{...styles.label, ...styles.textRight}}>
                                            Time
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                       {note.created_at.slice(11, 16)}
                                        </MyAppText>
                                    </View>
                                </ProfileCard>
                                </TouchableOpacity>
                                </View>

                            )
                        })}
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
       
    },
    imageContainer: {
        padding: 20,
        backgroundColor: '#F7F7FA',
    },
    docText: {
        opacity: 0.5,
        fontSize: 17,
        marginVertical: 5
    },
    noteContainer: {
        margin: 20
    },
    flexContainer: {
        backgroundColor: '#F7F7FA',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E6EAF0',
        borderBottomWidth: 1,
        borderBottomColor: '#E6EAF0',
        padding: 20,

    },
    lowerContainer: {
        padding: 20
    },
    label: {
        color: '#BBC2CC'
    },
    content: {
        color: '#2E2E2E'
    },
    textRight: {
        textAlign: 'right'
    }
});

export default DoctorsVitals