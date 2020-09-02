import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import CallIcon from '../../assets/sliders/images/ccphone1.svg';
import MyAppText from '../../Components/MyAppText';
import PhoneIcon from '../../assets/sliders/images/phone1.svg';
import InnerBtn from '../../Components/InnerBtn';
// import ImageIcon from '../../assets/sliders/images/ccphone.png';

const VoiceCall = () => {
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

export default VoiceCall