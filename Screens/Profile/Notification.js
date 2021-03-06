import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,AsyncStorage,ActivityIndicator, ScrollView, Image } from 'react-native';
import NotificationCard from '../../Components/NotificationCard';
import MyAppText from '../../Components/MyAppText';
import axios from '../../axios-req';
import errorHandler from '../ErrorHandler/errorHandler';

const Notification = (props) => {
    const [notification, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('user/notifications', {headers: {Authorization: res}})
                .then(
                    res => {
                        console.log("notifications", res.data)
                        setLoading(false)
                        const notification = res.data.data;
                        setNotifications(notification);
                       
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
            {notification.map(
                (item, index) => {
                    return (
                        <NotificationCard 
                        key= {index}
                        textDes ={item.notification}>
                        <Image
                         style= {{width: 20, height: 20, resizeMode: 'contain'}} 
                         source= {require('../../assets/sliders/images/notification.png')} />
                         <MyAppText style= {styles.textStyle}>
                            {item.created_at.slice(0, 10)}
                            </MyAppText>
                      </NotificationCard>
                    )
                }
            )}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 20
    },
    textStyle: {
        color: '#9B9B9B'
    },
    backText: {
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 17
    }
});

export default errorHandler(Notification, axios);