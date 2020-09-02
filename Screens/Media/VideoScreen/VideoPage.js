import React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Icon from '../../../assets/sliders/images/videoicon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyAppText from '../../../Components/MyAppText';
import InnerBtn from '../../../Components/InnerBtn';
const VideoPage = (props) => {
    return (
        <View style= {styles.container}>
        <View>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Consult')} style= {styles.videoContainer}>
                <Icon width= {300} height= {250} />
                <MyAppText  style= {styles.textStyle}>Virtual Consultations</MyAppText>
                <MyAppText style= {styles.textStyle2}>Skip the traffic and wrong rooms. Get an expert medical opinion using online virtual consultation without disrupting your daily life.</MyAppText>
            </TouchableOpacity>
        </View>
        <View style= {styles.btnContainer}>
        <InnerBtn onPress= {() => props.navigation.navigate('Consult')} width= "100%" text= "Start a new consultation" color= "white" bg= "#51087E" />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        height: Dimensions.get('window').height,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    videoContainer: {
        marginVertical: 100,
        alignItems: 'center'
    },
    textStyle: {
        color: '#1F1F1F',
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 18
    },
    textStyle2: {
        color: '#9B9B9B',
        marginHorizontal: 70,
        textAlign: 'center'
    },
    btnContainer: {
        // backgroundColor: 'white',
        width: '80%'
    }
});

export default VideoPage