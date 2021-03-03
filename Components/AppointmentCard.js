import React from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import MyAppText from './MyAppText';
import SlotIconText from './SlotIconText';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AppointmentCard = (props) => {
    const styles = StyleSheet.create({
        container : {
            marginBottom: 15,
            backgroundColor: 'white',
            minHeight: 180,
            // maxHeight: 250,
            borderWidth: 1,
            borderColor: '#E8E8E8',
            borderRadius: 5,
            shadowColor: "#1F1F1F1F",
            shadowOffset: {
                width: 5,
                height: 5,
            },
            shadowOpacity: 1,
            shadowRadius: 3.84,
    
            elevation: 5,
        },
        appIdText: {
            color: '#464646'
        },
        textStyle3: {
            color: '#9B9B9B',
            fontSize: 13
        },
        flexContainer: {
            // display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 18,
            paddingVertical: 10
          
        },
        flexContainer2: {
            // display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: '#E8E8E8',
            paddingHorizontal: 10,
            paddingVertical: 10
          
        },
        textStyle: {
            marginVertical: 15
        },
        textStyle1: {
            color: '#464646'
        },
        textStyle2: {
            color: '#9B9B9B'
        },
        textContainer: {
          width: '80%'  
        },
        statusText: {
            color: props.color
        }
        
    });
    return (
        <View style= {styles.container}>
            <TouchableOpacity onPress= {props.onPress}>
            <View style= {styles.flexContainer}>
                <Image
                  defaultSource= {require('../assets/sliders/images/placeh.png')} 
                style= {{width: 60, height: 60, resizeMode: 'cover', borderRadius: 60}} 
                source= {{uri: props.image}} />
                <View style= {styles.textContainer}>
                    <MyAppText>
                            <MyAppText style= {styles.textStyle2}>Appointment with</MyAppText>
                            <MyAppText style= {styles.textStyle1}>{` Dr ${props.doctor}`}</MyAppText>
                    </MyAppText>
                    {/* <MyAppText style= {styles.textStyle2}>Virtual General Practise</MyAppText> */}
                    <TouchableOpacity>
                        <SlotIconText color="#6C0BA9" icon= {<Icon
                        size={22}
                        color= "#000000"
                        name={Platform.OS === 'android' ? 'md-videocam' : 'ios-videocam'}></Icon>} text= {props.appdate} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style= {styles.flexContainer2}>
                <View style= {styles.appointment}>
                    <MyAppText style= {styles.textStyle3}>Appointment ID</MyAppText>
                    <MyAppText style= {styles.appIdText}>{props.appid}</MyAppText>
                </View>
                <View style= {styles.appointment}>
                <MyAppText style= {styles.textStyle3}>Status</MyAppText>
                <MyAppText style= {styles.statusText}>{props.status}</MyAppText>
                </View>
            </View>
            <MyAppText style= {styles.textStyle}>
                {props.textDes}
            </MyAppText>
            </TouchableOpacity>
        </View>
    )
}


export default AppointmentCard;