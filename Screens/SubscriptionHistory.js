import React, {useState, useEffect} from 'react';
import { View, StyleSheet,ActivityIndicator,AsyncStorage,
    Alert,
    TouchableOpacity, ScrollView, Button } from 'react-native';
import axios from '../axios-req';
import MyAppText from '../Components/MyAppText';
import SubscriptionCard from '../Components/SubscriptionCard';
import errorHandler from './ErrorHandler/errorHandler';

const SubscriptionHistory = (props) => {
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(false)


    const getSubHistory = () => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get('user/payment/history', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false) ;
                        console.log("history", res.data);
                        const history = res.data.data.slice(0, 10); 
                        setHistory(history)             
                    }
                )
                .catch(err => {
                    setLoading(false)
                    setError(true)
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          getSubHistory()
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
           {history.length === 0 ? (<MyAppText style= {{textAlign: 'center'}}>No data present</MyAppText>) : null}
            {history.map(
              (item, index) => {
                let color = null;
                if (item.status_name === 'Success') {
                  color = "green"
                } else if (item.status_name === 'Pending') {
                  color= "orange"
                } else if (item.status_name === 'Expired') {
                  color= "red"
                } else {
                  color = "black"
                }
                return (
                  <SubscriptionCard 
                  key= {index} date= {item.created_at}
                  amount = {item.amount}
                  status = {item.status_name}
                  color= {color}
                  plan= {item.plan}
                   />
                )
              }
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 25,
    },
    btnStyle: {
        color: '#6C0BA9',
        backgroundColor: '#F7EAFF',
        height: 30,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#6C0BA9',
        borderRadius: 5,
        marginVertical: 20
      },
});

export default errorHandler(SubscriptionHistory, axios);