import React, {useEffect, useState} from 'react';
import { View, StyleSheet,AsyncStorage,ActivityIndicator,Alert, TouchableOpacity,ScrollView } from 'react-native';
import MyAppText from '../../../Components/MyAppText';
import ProfileCard from '../../../Components/ProfileCard';
import axios from '../../../axios-req'
import errorHandler from '../../ErrorHandler/errorHandler';



const Medications = (props) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('user/medication/show', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log("medications,", res.data)
                        const notes = res.data.data
                        setNotes(notes)
                       
                    }
                )
                .catch(err => {
                    setLoading(false)
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
              {notes.length === 0 ? (<MyAppText style= {{textAlign: 'center'}}>No data present</MyAppText>) : null}
            <View style= {styles.noteContainer}>
                        {notes.map((note, index) => {
                            const doctors_name = `${note.title} ${note.name} ${note.last_name}`
                            return (
                                <View key= {index}>
                            <TouchableOpacity onPress= {() => props.navigation.navigate('ViewPrescription', {name: doctors_name, drug: note.drug,dosage: note.dosage, frequency: note.frequency, date: note.created_at }) }>
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
                                            By
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                       {doctors_name}
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

export default errorHandler(Medications, axios);