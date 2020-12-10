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
                    <MyAppText style= {styles.textColor1}>
                        {props.specialty}
                    </MyAppText>
                    <MyAppText style= {styles.textColor1}>
                        {props.qualification}
                    </MyAppText>
                    <MyAppText style= {styles.textColor1}>
                        {props.experience}
                    </MyAppText>
                    <SlotIconText width= "100%" paddingBottom= {10} text= {props.lang} icon= {<VoiceIcon width= {24} height= {24} />}  />
                    </View>
                </View>
                <Icon2 width= {24} height= {24} />
            </View>
            <View style= {styles.secondContainer}>
                {/* <MyAppText style= {styles.textColor2}>
                Eko Hospital Lekki, Lagos.
                </MyAppText> */}
                <MyAppText style= {styles.textColor3}>
                    NEXT AVAILABLE
                </MyAppText>
                <SlotIconText 
                text= {props.available}
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
    textColor1: {
        color: '#9B9B9B',
        marginBottom: 4
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