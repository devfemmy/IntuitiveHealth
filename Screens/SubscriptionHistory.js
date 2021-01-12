import React, {useState, useEffect} from 'react';
import { View, StyleSheet,ActivityIndicator,AsyncStorage,
    Alert,
    TouchableOpacity, ScrollView, Button } from 'react-native';
import axios from '../axios-req';

const SubscriptionHistory = (props) => {
    const [loading, setLoading] = useState(true);


    const inititatePayment = () => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                const data = {
                    subscription_name: plan
                }
                axios.post('payment/initiate', data, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)                  
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
                              {text: 'OK', onPress: () => null},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                        // showLoaded(true)
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
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            inititatePayment()
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 25
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

export default SubscriptionHistory