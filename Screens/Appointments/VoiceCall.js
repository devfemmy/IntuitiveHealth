import React, {useEffect, useState} from 'react';
import { View, StyleSheet,ActivityIndicator,AsyncStorage, ScrollView,Linking, Text, Image } from 'react-native';
import CallIcon from '../../assets/sliders/images/ccphone1.svg';
import MyAppText from '../../Components/MyAppText';
import PhoneIcon from '../../assets/sliders/images/phone1.svg';
import InnerBtn from '../../Components/InnerBtn';
import axios from '../../axios-req';
import errorHandler from '../ErrorHandler/errorHandler';
// import ImageIcon from '../../assets/sliders/images/ccphone.png';

const VoiceCall = () => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)


    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                console.log('token', res)
                axios.get('conduithealth/phone', {headers: {Authorization: res}})
                .then(
                    res => {
                        // console.log('number', res.data.data[0])
                        setLoading(false)
                        const contactNumber = res.data.data.emergency_no;
                        setPhone(contactNumber);
                        console.log(contactNumber)
                        // setPhone(contactNumber);
                        
                       
                    }
                )
                .catch(err => {
                    setLoading(false)
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
              <View style= {styles.voiceCall}>
                  {/* <ImageIcon style= {styles.imageStyle} />
                   */}
                    <CallIcon width={265} height= {246} />
                    {/* <Image style= {styles.imageStyle} source= {require('../../assets/sliders/images/ccphone.png')} /> */}
                    <MyAppText style= {styles.textStyle}>
                    Don’t have Data? Call our Toll-Free Number to continue with your consultation.
                    </MyAppText>

              </View>
              <View style= {styles.btnContainer}>
                    <InnerBtn
                    onPress={()=>{Linking.openURL(`tel:${phone}`);}}
                    bg= "white"
                    color= "#51087E"
                    text= "Call Now" 
                    icon= {<PhoneIcon width= {18} height= {18} />} />                                    
              </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#51087E',
    },
    voiceCall: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        margin: 25,
        paddingVertical: 20
    },
    btnContainer: {
        padding: 25
    },
    imageStyle: {
        width: 250,
        height: 250
    }
});

export default errorHandler(VoiceCall, axios);