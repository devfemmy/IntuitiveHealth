import React, {useEffect, useState} from 'react';
import { View, StyleSheet,AsyncStorage,ActivityIndicator,Alert, TouchableOpacity,ScrollView } from 'react-native';
import DoctorCard from '../../Components/DoctorCard';
import axios from '../../axios-req';
import ProfileCard from '../../Components/ProfileCard';
import MyAppText from '../../Components/MyAppText';
import InnerBtn from '../../Components/InnerBtn';
import errorHandler from '../ErrorHandler/errorHandler';



const Comments = (props) => {
    const {title, id, status} = props.route.params
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [last_name, setLastname] = useState('');
    const [topic, setTopic] = useState('');
    const [history_id, setHistory_id] = useState('');
    const [error, setError] = useState(false)

    let showBtn = null;
    useEffect(() => {
        const token = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get(`user/second/get/${id}`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log("images", res.data);
                        const data = res.data.data;
                        const name = data.doctor_first_name;
                        const last_name= data.doctor_last_name;
                        const image = data.image;
                        const topics = data.topic;
                        const history = parseInt(data.history_id);
                        setHistory_id(history)
                        setTopic(topics)
                        setName(name);
                        setLastname(last_name);
                        setImage(image)
                       
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
    if (status >= 3) {
        showBtn = (
            <InnerBtn onPress= {() => props.navigation.navigate('ViewDeNote', {id: history_id, name: name, last_name: last_name})} color= "white" bg= "#51087E" text= "View Doctor's Note" />
        )
    }
    return (
        <View style= {styles.container}>
            <ScrollView style= {styles.noteContainer}>
            <View>
                {/* <TouchableOpacity> */}
                <DoctorCard 
                image= {{uri: image}}
                // college= "Primary care"
                name= {`Dr ${name} ${last_name}` 
            
            }
                // experience= "23 years experience overall"
                 />
                {/* </TouchableOpacity> */}
            </View>
            <View>
                <MyAppText style= {{opacity: 0.5, marginVertical: 5}}>Topic:</MyAppText>
                <ProfileCard>
                    <MyAppText>
                        {topic}
                    </MyAppText>
                </ProfileCard>
            </View>
                </ScrollView>
                <View style= {styles.footer}>
                    {showBtn}
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1
       
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
    footer: {
        margin: 20
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

export default errorHandler(Comments, axios);