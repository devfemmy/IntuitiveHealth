import React, {useEffect,useState} from 'react';
import { View, StyleSheet,Alert, ScrollView,
    AsyncStorage, Text, Dimensions, Image, Linking } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import ArrowIcon from '../assets/sliders/images/arrow1.svg'
import axios from 'axios';
import MyAppText from '../Components/MyAppText';
const Faq = () => {
    const [faqs, setFaq] = useState([]);
    const [phone, setPhone] = useState([]);
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                console.log('token', res)
                axios.get('https://conduit.detechnovate.net/public/api/faqs', {headers: {Authorization: res}})
                .then(
                    res => {
                        const faq = res.data.data;
                        setFaq(faq)
                       
                    }
                )
                .catch(err => {
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
                axios.get('https://conduit.detechnovate.net/public/api/help/no', {headers: {Authorization: res}})
                .then(
                    res => {
                        // console.log('number', res.data.data[0])
                        const contactNumber = res.data.data;
                        setPhone(contactNumber);
                        console.log(contactNumber)
                        // setPhone(contactNumber);
                        
                       
                    }
                )
                .catch(err => {
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
    return (
        <ScrollView style= {styles.container}>
            <View>
            {faqs.map(
                (faq, index) => {
                    return (
                        <View key= {index}>
                            <Collapse style= {styles.collapse}>
                                <CollapseHeader>
                                <View style= {styles.flexCont}>
                                    <MyAppText style= {styles.textStyle}>
                                        {faq.question}
                                    </MyAppText>
                                <ArrowIcon width={30} height= {30} />
                                </View>
                                </CollapseHeader>
                                <CollapseBody>
                                <MyAppText style= {styles.faqText}> 
                                    {faq.answer}
                                </MyAppText>
                                </CollapseBody>
                            </Collapse>
                        </View>
                    )
                }
            )}
            </View>
            
            <View style= {styles.textContainer}>
                <Text style= {styles.textStyle2}>For more enquires, Please call any of the following numbers:</Text>
                {phone.map(
                    (number, index) => {
                        return (
                            
                                <View key= {index}>
                                    <MyAppText onPress={()=>{Linking.openURL(`tel:${number.number}`);}}>
                                    {number.number}
                                    </MyAppText>
                                    
                                </View>
                            
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
    textStyle2: {
        fontSize: 16,
        marginVertical: 5
    },
    collapse: {
        backgroundColor: '#F7F7FA',
        marginVertical: 5,
        paddingVertical: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        minHeight: 40
    }
});

export default Faq