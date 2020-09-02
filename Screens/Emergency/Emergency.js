import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import EmergencyIcon from '../../assets/sliders/images/emergency.svg';
import PhoneIcon from '../../assets/sliders/images/ecall.svg';
import VideoIcon from '../../assets/sliders/images/evideo.svg';
import MyAppText from '../../Components/MyAppText';
import ProfileCard from '../../Components/ProfileCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Emergency = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.firstContainer}>
                <EmergencyIcon width= {320} height= {220} />
                <MyAppText style= {styles.textStyle}>
                Instant consultation on the go anytime anywhere.
                </MyAppText>
            </View>
            <View style= {styles.lowerContainer}>
                <TouchableOpacity onPress= {()=> props.navigation.navigate('Virtual')}>
                    <ProfileCard>
                        <View>
                            <VideoIcon width= {50} height= {50} />
                        </View>
                        <View style= {styles.textContainer}>
                        <MyAppText style= {styles.textStyle2}>Enter Virtual consultation waiting room</MyAppText>
                        </View>
                    </ProfileCard>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=> props.navigation.navigate('Voice')}>
                    <ProfileCard>
                        <View>
                            <PhoneIcon width= {50} height= {50} />
                        </View>
                        <View style= {styles.textContainer}>
                        <MyAppText style= {styles.textStyle2}>Voice Consultation</MyAppText>
                        </View>
                    </ProfileCard>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#51087E',
    },
    firstContainer: {
        alignItems: 'center'
    },
    lowerContainer: {
        margin: 20,
        marginVertical: 50
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        margin: 25,
        textAlign: 'center'
    },
    textStyle2: {
        color: '#51087E',
        fontSize: 18
    },
    textContainer: {
        backgroundColor: 'white',
        width: '80%'
    }
});

export default Emergency