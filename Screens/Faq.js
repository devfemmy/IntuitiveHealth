import React, {useEffect,useState} from 'react';
import { View, StyleSheet,Alert, ScrollView,ActivityIndicator,
    AsyncStorage, Text, Dimensions, Image, Linking } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import ArrowIcon from '../assets/sliders/images/arrow1.svg'
import axios from '../axios-req';
import MyAppText from '../Components/MyAppText';
import errorHandler from './ErrorHandler/errorHandler';

const Faq = () => {
    const [faqs, setFaq] = useState([]);
    const [phone, setPhone] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                console.log('token', res)
                axios.get('user/faqs', {headers: {Authorization: res}})
                .then(
                    res => {
                        const faq = res.data.data;
                        setFaq(faq);
                        setLoading(false)
                       
                    }
                )
                .catch(err => {
                    const code = err.response.status;
                    setError(true);
    
                });
                axios.get('help/no', {headers: {Authorization: res}})
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
                    setError(true)
    
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

export default errorHandler(Faq, axios);