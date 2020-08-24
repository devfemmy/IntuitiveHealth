import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Icon from '../../assets/sliders/images/callcenter.svg';
import MyAppText from '../../Components/MyAppText';
import PhoneIcon from '../../assets/sliders/images/phone1.svg';
import InnerBtn from '../../Components/InnerBtn';
const VoiceCall = () => {
    return (
        <ScrollView style= {styles.container}>
              <View style= {styles.voiceCall}>
                    <Icon width={265} height= {246} />
                    <MyAppText style= {styles.textStyle}>
                    Don’t have Data? Call our Toll-Free Number to continue with your consultation.
                    </MyAppText>

              </View>
              <View style= {styles.btnContainer}>
                    <InnerBtn
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
    }
});

export default VoiceCall