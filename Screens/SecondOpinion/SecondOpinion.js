import React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Icon from '../../assets/sliders/images/secondopinion.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';

const SecondOpinion = (props) => {
    return (
        <View style= {styles.container}>
        <View>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Consult')} style= {styles.videoContainer}>
                <Icon width= {300} height= {250} />
                <MyAppText  style= {styles.textStyle}>Second Opinion</MyAppText>
                <MyAppText style= {styles.textStyle2}>Let us get your second opinion</MyAppText>
            </TouchableOpacity>
        </View>
        <View style= {styles.btnContainer}>
        <InnerBtn onPress= {() => props.navigation.navigate('Title')} width= "100%" text= "Start Second Opinion Process" color= "white" bg= "#51087E" />
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

export default SecondOpinion