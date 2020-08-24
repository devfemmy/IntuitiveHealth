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


const ConsultCard = (props) => {
    return (
        <View style= {styles.container}>
            <View style= {styles.firstContainer}>
                <Image style= {styles.imageStyle} 
                source={{uri: props.image}} />
                <View style= {styles.textContainer}>
                    <View>  
                    <MyAppText style= {styles.textStyle}>
                        {props.name}
                    </MyAppText>
                    <MyAppText style= {styles.textColor1}>Primary care</MyAppText>
                    <MyAppText style= {styles.textColor1}>23 years experience overall</MyAppText>
                    <IconText width= "82%" paddingBottom= {10} text= "English, Yoruba, Hausa" icon= {<VoiceIcon width= {24} height= {24} />}  />
                    </View>
                </View>
                <Icon2 width= {24} height= {24} />
            </View>
            <View style= {styles.secondContainer}>
                <MyAppText style= {styles.textColor2}>
                Eko Hospital Lekki, Lagos.
                </MyAppText>
                <MyAppText style= {styles.textColor3}>
                    NEXT AVAILABLE
                </MyAppText>
                <IconText 
                width= "40%"
                text= "12:00PM, Today"
                icon= {<Icon
                      size={22}
                      color= "#6C0BA9"
                      name={Platform.OS === 'android' ? 'md-videocam' : 'ios-videocam'} />}  />
            </View>
            <View style= {styles.btnContainer}>
                <InnerBtn onPress= {props.pressed} bg= "#51087E" color= "#FAFAFA" text= "Book Consultation" />
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
        marginVertical: 10
    },
    textColor1: {
        color: '#9B9B9B'
    },
    btnContainer: {
        marginHorizontal: 15
    },
    textColor2: {
        color: '#464646',
        fontWeight: 'bold'
    },
    textColor3: {
        color: '#880ED4'
    },
    imageStyle: {
        width: 70,
        height: 70,
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
        display: 'flex',
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

export default ConsultCard