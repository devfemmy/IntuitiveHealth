import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Icon2 from '../assets/sliders/images/verified.svg';
import IconText from './IconText';
import VoiceIcon from '../assets/sliders/images/voicechat.svg';
import VidIcon from '../assets/sliders/images/vidcam.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import MyBtn from './MyBtn';
import InnerBtn from './InnerBtn';
import MyAppText from './MyAppText';
import SlotIconText from './SlotIconText';


const MyDoctorsCard = (props) => {
    return (
        <View style= {styles.container}>
            <View style= {styles.firstContainer}>
                <Image style= {styles.imageStyle} 
                defaultSource= {require('../assets/sliders/images/placeh.png')} 
                source={props.image} />
                <View style= {styles.textContainer}>
                    <View>  
                    <MyAppText style= {styles.textStyle}>
                        {props.name}
                    </MyAppText>
                    <MyAppText style= {styles.textColor1}>{props.section}</MyAppText>
                    <MyAppText style= {styles.textColor1}>{props.experience}</MyAppText>
                    </View>
                </View>
                <Icon2 width= {24} height= {24} />
            </View>
            <View style= {styles.secondContainer}>
                    <SlotIconText 
                    text= {props.language}
                    // icon= {<VoiceIcon width= {15} height= {15} />}  
                    />
        
            <View style= {styles.btnContainer}>
                <InnerBtn onPress= {props.pressed} bg= "#51087E" color= "#FAFAFA" text= "Book Appointment" />
            </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: '#E8E8E8',
        minHeight: 200,
        marginHorizontal: 30,
        marginVertical: 10,
        shadowColor: "#1F1F1F1F",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 5,
    },
    iconContainer: {
        width: '100%'
    },
    btnContainer: {
        width: '100%'
    },
    textColor1: {
        color: '#9B9B9B'
    },
    textColor2: {
        color: '#464646',
        fontWeight: 'bold'
    },
    textColor3: {
        color: '#880ED4'
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 40,
    },
    firstContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 10
    },
    secondContainer: {
        padding: 10,
        borderTopColor: '#E8E8E8',
        borderTopWidth: 1
    },
    textContainer: {
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default MyDoctorsCard