import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Alert, ScrollView,AsyncStorage, ActivityIndicator } from 'react-native';
import MyAppText from '../../Components/MyAppText';
import ProfileCard from '../../Components/ProfileCard';
import axios from '../../axios-req';
import InnerBtn from '../../Components/InnerBtn';
import errorHandler from '../ErrorHandler/errorHandler';


const ViewDeNotes = (props) => {
    const {title, id, name, last_name} = props.route.params
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('');
    const [comments, setComments] = useState('');
    const [recommendation, setRecomm] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const token = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get(`user/my/note/${id}`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log("notes", res.data);
                        const data = res.data.data;
                        const date = data[0].created_at;
                        const comment = data[0].notes;
                        const recommendation = data[0].recommendation;
                        setDate(date);
                        setComments(comment);
                        setRecomm(recommendation)
                        
                       
                    }
                )
                .catch(err => {
                    setLoading(false);
                    setError(true);
    
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
        <View style= {styles.container}>
                <ScrollView>
                    <ProfileCard>
                                <View style= {styles.textContainer}>
                                        <MyAppText style= {styles.label}>
                                            Date
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                            {date.slice(0, 10)}
                                        </MyAppText>
                                    </View>
                                    <View style= {styles.textContainer}>
                                        <MyAppText style= {{...styles.label, ...styles.textRight}}>
                                            By
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                            {`Dr ${name} ${last_name}`}
                                        </MyAppText>
                                    </View>
                            </ProfileCard>
                            <View style= {styles.noteContainer}>
                                <MyAppText style= {styles.label}>Doctor's Comment</MyAppText>
                                <ProfileCard>
                                    <MyAppText>
                                        {comments}
                                    </MyAppText>
                                </ProfileCard>
                            </View>
                            <View style= {styles.noteContainer}>
                                <MyAppText style= {styles.label}>Doctor's Recommendation</MyAppText>
                                <ProfileCard>
                                    <MyAppText>
                                        {recommendation}
                                    </MyAppText>
                                </ProfileCard>
                            </View>
                </ScrollView>
                <View style= {styles.footer}>
                <InnerBtn onPress= {() => props.navigation.popToTop()} color= "white" bg= "#51087E" text= "Go back to Second Opinion" />
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 25,
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
    lowerContainer: {
        padding: 20
    },
    noteContainer: {
        marginVertical: 10
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

export default errorHandler(ViewDeNotes, axios);