import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Text,Alert, ScrollView,AsyncStorage, Image, Platform, ActivityIndicator } from 'react-native';
import DoctorCard from '../../../Components/DoctorCard';
import { Button, Overlay } from 'react-native-elements';
import IconText from '../../../Components/IconText';
import VoiceIcon from '../../../assets/sliders/images/vchat.svg';
import SchoolIcon from '../../../assets/sliders/images/school.svg';
import SlotBtn from '../../../Components/SlotBtn';
import MyAppText from '../../../Components/MyAppText';
import SlotIconText from '../../../Components/SlotIconText';
import Icon from 'react-native-vector-icons/Ionicons';
import SlotPicker from '../../../Components/SlotPicker';
import { useLinkProps } from '@react-navigation/native';
import axios from 'axios';
import UnavailableDoctor from '../../../Components/UnavailableDoc';

const TimeSlot = (props) => {
    const { doctor_id, group_id } = props.route.params;
    const [loading, setLoading] = useState(true);
    const [slots, setSlots] = useState([]);
    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [showSlot, setShowSlot] = useState([]);
    const [slotDate, setSlotDate] = useState('');
    const [count, setCount] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('')
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get(`https://conduit.detechnovate.net/public/api/conduithealth/doctor/slots/${doctor_id}`, {headers: {Authorization: res}})
                .then(
                  
                    res => {
                        console.log('slots', res.data)
                        setLoading(false)
                        const profile = res.data.data;
                        const image = profile.image;
                        const title = profile.title;
                        const name = profile.name;
                        const last_name = profile.last_name;
                        const slotArray = res.data.data.appointments;
                        setSlots(slotArray);
                        setName(name);
                        setLastName(last_name);
                        setTitle(title);
                        setImage(image);
                        console.log("slots", slotArray)
                       
                    }
                )
                .catch(err => {
                    console.log(err.response)
                    const code = err.response.status;
                    const message = err.response.data.message
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
                      setLoading(false);
                      setMessage(message)
                      toggleOverlay()
                        // Alert.alert(
                        //     message,
                        //     'Please Try Another',
                        //     [
                        //       {text: 'OK', onPress: () => props.navigation.popToTop()},
                        //     ],
                        //     { cancelable: false }
                        //   )
                    }
    
                      
                      console.log(err.response)
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
        
    
      }, []);

      const toggleOverlay = () => {
        setVisible(true);
        setTimeout(function(){ moveToHome() }, 1500);
        
      };

      function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }
    const showAvailable = (slot, day, date, count) => {
        setShowSlot(slot)
        const appDate = `${date}, ${day} `;
        setSlotDate(appDate);
        const concatCount = `${count} Slots`
        setCount(concatCount)
        
    }
    const moveToHome = () => {
        setVisible(false)
        props.navigation.popToTop()
    }
    // alert(doctor_id)
    if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.first}>
                <DoctorCard 
                image= {{uri: image}}
                // college= "Primary care"
                name= {`${title} ${name} ${last_name}`  }
                // experience= "23 years experience overall"
                 />
                {/* <IconText
                size= {14}
                width= "49%"
                paddingBottom= {10}
                color= "#9B9B9B" 
                icon= {<VoiceIcon width= {20} height= {20} />}
                text= "English, Yoruba, Hausa" />
                <IconText
                 size= {14}
                width= "25%"
                paddingBottom= {10}
                color= "#9B9B9B" 
                icon= {<SchoolIcon width= {20} height= {20} />}
                text= "MBBS, MS" /> */}
            </View>
            <View>
                <ScrollView  style= {styles.secondCont} horizontal>
                    {slots.map(
                        (slot, index) => {
                            return (
                                <View key= {index}>
                                <SlotBtn 
                                onPress= {() => showAvailable(slot.slots, slot.appointment_date, 
                                    slot.appointment_day, slot.count)}
                                date= {`${slot.appointment_day}, ${slot.appointment_date}`}
                                name= {`${slot.count} Slot Available`}
                                border= "#BBC2CC"
                                style2= {styles.textStyle2}
                                    style1= {styles.textStyle} />
                                </View>
                            )
                        }
                    )}
                </ScrollView>
            </View>
            <View style= {styles.bottomContainer}>
            <MyAppText style= {styles.textStyle4}>
                       {`${slotDate}`}             
            </MyAppText>
            <MyAppText style= {styles.textStyle5}>
                       {`${count}`}             
            </MyAppText>
            <View style= {styles.flexContainer}>
                {showSlot.map(
                    (show, index) => {
                        const sliceTime = show.app_time.slice(0, 5);
                        return (
                            <View key= {index}>
                           
                                <SlotPicker 
                                onPress = {()=> props.navigation.navigate('Patient',{slots: show, image: image, 
                                group_id: group_id,
                                title: title, name: name, last_name: last_name})} 
                                border= "#51087E" color= "#51087E" time= {tConvert(sliceTime)} />                                
                            </View>
                           
                        )
                    }
                )}
                </View>
                <View>
            <Overlay isVisible={visible} onBackdropPress={moveToHome}>
                <UnavailableDoctor message= {message} />
            </Overlay>
            </View>
               
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        fontFamily: 'HammersmithOne-Regular',
    },
    first: {
        padding: 25
    },
    doctorContainer: {

    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        marginHorizontal: 20
        // alignItems: 'flex-start',
        // overflow: 'visible',
    },
    textStyle4: {
        textAlign: 'center',
        fontSize: 18
    },
    textStyle: {
        fontWeight: 'bold'
    },
    textStyle1: {
       color: '#880ED4'
    },
    textStyle2: {
        fontWeight: '100',
        opacity: 0.3
    },
    textStyle5: {
        opacity: 0.5,
        textAlign: 'center'
    },
    secondCont: {
     backgroundColor: '#E6EAF0',
     display: 'flex',
     flexDirection: 'row',
     minHeight: 95,
     padding: 15
    },
    imageStyle: {
        width: 50,
        height: 50,
        resizeMode: 'cover'
    },
    bottomContainer: {
        marginVertical: 30
    },
    slotContainer: {
       borderTopColor: '#E6EAF0',
       borderTopWidth: 1,
       marginHorizontal: 15,
       paddingVertical: 15
    }
});

export default TimeSlot;