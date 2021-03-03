import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../../../assets/sliders/images/doc2.svg';
import Icon2 from '../../../assets/sliders/images/doc.svg';
import MyAppText from '../../../Components/MyAppText';
import Keyback from '../../../assets/sliders/images/keyback.svg';
import axios from '../../../axios-req';
import errorHandler from '../../ErrorHandler/errorHandler';


const FindConsult = (props) => {
    const [specialization, setSpecialization] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('user/client/specialisation', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        const data = res.data.data;
                        console.log("data", data)
                        // console.log('doctors', doctors)
                        setSpecialization(data)
                       
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
            <MyAppText style= {styles.textStyle}>
            What kind of consultation do you want?
            </MyAppText>
            {specialization.map(
                (specialty, index) => {
                    const process_type = parseInt(specialty.process_type);
                    if (process_type === 1) {
                        return (
                            <TouchableOpacity key= {index} onPress= {() => props.navigation.navigate('Practise', {name: specialty.name, id: process_type})}>
                            <View style= {styles.card}>
                                <View style= {styles.imgCont}>
                              <Image 
                                defaultSource= {require('../../../assets/sliders/images/placeh.png')} 
                              source= {{uri: specialty.image}} style= {styles.imageStyle} />
                                </View>
                                <View style= {styles.textCont}>
                                    <MyAppText style= {styles.boldText}>
                                       {specialty.name}
                                    </MyAppText>
                                </View>
                            </View>
                    </TouchableOpacity>
                        )
                    }else {
                        return (
                            <TouchableOpacity key= {index} onPress= {() => props.navigation.navigate('Mental', {name: specialty.name, id: process_type})}>
                            <View style= {styles.card}>
                                <View style= {styles.imgCont}>
                              <Image source= {{uri: specialty.image}} style= {styles.imageStyle} />
                                </View>
                                <View style= {styles.textCont}>
                                    <MyAppText style= {styles.boldText}>
                                       {specialty.name}
                                    </MyAppText>
                                </View>
                            </View>
                    </TouchableOpacity>
                        )
                    }

                }
            )}
{/* 
            <TouchableOpacity onPress= {() => props.navigation.navigate('Mental')}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <Icon2 width= {120} height= {120} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Mental Health Specialist
                            </MyAppText>
                        </View>
                    </View>
            </TouchableOpacity> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#51087E',
        padding: 20,
        paddingHorizontal: 30
    },
    textCont: {
        width: '50%'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 20,
        marginHorizontal: 10,
        fontSize: 30
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    imageStyle: {
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },
    colorText: {
        color: '#6C0BA9'
    },
    card: {
        backgroundColor: 'white',
        minHeight: 120,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
        marginBottom: 20,
    },
});

export default errorHandler(FindConsult, axios);