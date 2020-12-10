import React, {useEffect, useState} from 'react';
import { View, StyleSheet,AsyncStorage,ActivityIndicator,Alert, TouchableOpacity,ScrollView } from 'react-native';
import axios from '../../axios-req';
import MyAppText from '../../Components/MyAppText';
import ProfileCard from '../../Components/ProfileCard';
import StatusCard from '../../Components/StatusCard';



const ViewSecondOpinion = (props) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('second/list', {headers: {Authorization: res}})
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
                    const status = parseInt(note.status);
                    if (status >= 2) {
                        return (
                            <View key= {index}>
                            <TouchableOpacity onPress= {() => props.navigation.navigate('Comments', {title: note.title, id: note.id, status: status }) }>
                                    <StatusCard status= "Status:" color= "green" second = {note.status_name}>
                                    {/* <View>
                                        <MyAppText style= {styles.label}>Status:</MyAppText>
                                        <MyAppText>Under review</MyAppText>
                                    </View> */}
                                    <View style= {styles.textContainer}>
                                        <MyAppText style= {styles.label}>
                                            Title:
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                        {note.title}
                                        </MyAppText>
                                    </View>
                                    <View style= {styles.textContainer}>
                                        <MyAppText style= {{...styles.label, ...styles.textRight}}>
                                            Date:
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                        {note.created_at.slice(0, 16)}
                                        </MyAppText>
                                    </View>
                                </StatusCard>
                                </TouchableOpacity>
                                </View>
                        )
                    } else {
                        return (
                            <View key= {index}>
                            <TouchableOpacity>
                                    <StatusCard status= "Status:" color= "#FC7E00" second = {note.status_name}>
                                    {/* <View>
                                        <MyAppText style= {styles.label}>Status:</MyAppText>
                                        <MyAppText>Under review</MyAppText>
                                    </View> */}
                                    <View style= {styles.textContainer}>
                                        <MyAppText style= {styles.label}>
                                            Title:
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                        {note.title}
                                        </MyAppText>
                                    </View>
                                    <View style= {styles.textContainer}>
                                        <MyAppText style= {{...styles.label, ...styles.textRight}}>
                                            Date:
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                        {note.created_at.slice(0, 16)}
                                        </MyAppText>
                                    </View>
                                </StatusCard>
                                </TouchableOpacity>
                                </View>
                        )
                    }

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

export default ViewSecondOpinion