import React, {useEffect,useState} from 'react';
import { View, StyleSheet,Alert, ScrollView,ActivityIndicator,
    AsyncStorage, Text, Dimensions, Image, Linking } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import ArrowIcon from '../assets/sliders/images/arrow1.svg'
import axios from '../axios-req';
import MyAppText from '../Components/MyAppText';
import UploadIcon from '../assets/sliders/images/contact.svg';
import ProfileCard from '../Components/ProfileCard';
import errorHandler from './ErrorHandler/errorHandler';


const ContactUs = () => {
    const [phone, setPhone] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                console.log('token', res)
                axios.get('user/help/no', {headers: {Authorization: res}})
                .then(
                    res => {
                        // console.log('number', res.data.data[0])
                        setLoading(false)
                        console.log('contact us', res)
                        const contactNumber = res.data.data;
                        setPhone(contactNumber);
                        console.log(contactNumber)
                        // setPhone(contactNumber);
                        
                       
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
                        // showLoaded(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => console.log(err)},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                      console.log(err.response.status)
    
                });

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
            <View style= {styles.imageContainer}>
                <UploadIcon width= {250} height={220} />
            </View>
            <View style= {styles.textContainer}>
                <MyAppText style= {styles.textStyle3}>
                    Feel Free To Contact Us today
                </MyAppText>
                {phone.map(
                    (number, index) => {
                     if (number.id === 1) {
                        return (
                            
                            <View key= {index}>
                                <ProfileCard>
                                    <MyAppText style= {styles.contactStyle} onPress={()=>{Linking.openURL(`tel:${number.number}`);}}>
                                    {`Call ${number.display}`}
                                    </MyAppText>
                                </ProfileCard>
                                
                            </View>
                        
                    )
                     }else if (number.id === 2) {
                        return (
                            
                            <View key= {index}>
                                <ProfileCard>
                                    <MyAppText style= {styles.contactStyle} onPress={()=>{Linking.openURL(`mailto:${number.number}`);}}>
                                    {`Mail to: ${number.display}`}
                                    </MyAppText>
                                </ProfileCard>
                                
                            </View>
                        
                    )
                     }else {
                        return (
                            
                            <View key= {index}>
                                <ProfileCard>
                                    <MyAppText style= {styles.contactStyle} onPress={()=>{Linking.openURL(`https:${number.number}`);}}>
                                    {`${number.display}`}
                                    </MyAppText>
                                </ProfileCard>
                                
                            </View>
                        
                    )
                     }

                    }
                )}
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 25,
        minHeight: 300
    },
    textContainer: {
       marginVertical: 15
    },
    flexCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    faqText: {
        opacity: 0.5,
        fontWeight: '100',
        fontSize: 15
    },
    textStyle: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    contactStyle: {
        textAlign: 'center'
    },
    textStyle2: {
        fontSize: 16,
        marginVertical: 5
    },
    textStyle3: {
        color: '#6C0BA9',
        textAlign: 'center',
        fontSize: 25,
        marginHorizontal: 50,
        marginBottom: 20
    },
    collapse: {
        backgroundColor: '#F7F7FA',
        marginVertical: 5,
        paddingVertical: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        minHeight: 40
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 30
    }
});

export default errorHandler(ContactUs, axios);