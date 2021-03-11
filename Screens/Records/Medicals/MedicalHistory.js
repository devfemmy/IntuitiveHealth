import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import axios from '../../../axios-req';
import ProfileCard from '../../../Components/ProfileCard';
import SlotIconText from '../../../Components/SlotIconText';
import Icon1 from '../../../assets/sliders/images/icon1.svg';
import Icon2 from '../../../assets/sliders/images/icon2.svg';
import Icon3 from '../../../assets/sliders/images/icon3.svg';
import Icon4 from '../../../assets/sliders/images/icon4.svg';
import Arrow from '../../../assets/sliders/images/arrow.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import errorHandler from '../../ErrorHandler/errorHandler';

const MedicalHistory = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const confirmOtp = () => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('user/otp/confirm', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)                       
                    }
                )
                .catch(err => {
                    setLoading(false)
                    setError(true);
    
                      
                    
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            confirmOtp()
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
            <View  style= {styles.lowerContainer}>
                    <TouchableOpacity onPress= {()=>props.navigation.navigate('DoctorsNote')}>
                        <ProfileCard>
                            <SlotIconText size= {19} icon= {<Icon3 width= {30} height= {30} />} text= "Doctor Note" />
                            <Arrow width= {30} height= {30} />
                        </ProfileCard>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress= {()=>props.navigation.navigate('Medications')}>
                        <ProfileCard>
                            <SlotIconText 
                            size= {19} icon= {<Icon4 width= {30} height= {30} />} 
                            text= "Prescriptions" />
                            <Arrow width= {30} height= {30} />
                        </ProfileCard>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {()=>props.navigation.navigate('DoctorsVitals')}>
                        <ProfileCard>
                            <SlotIconText size= {19} icon= {<Icon2 width= {30} height= {30} />} text= "Vitals" />
                            <Arrow width= {30} height= {30} />
                        </ProfileCard>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress= {()=>props.navigation.navigate('ViewUpload')}>
                        <ProfileCard>
                            <SlotIconText size= {19} icon= {<Icon1 width= {30} height= {30} />} text= "Documents" />
                            <Arrow width= {30} height= {30} />
                        </ProfileCard>
                    </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        marginVertical: 30
       
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

export default errorHandler(MedicalHistory, axios);