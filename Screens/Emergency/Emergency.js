import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import EmergencyIcon from '../../assets/sliders/images/emergency1.svg';
import PhoneIcon from '../../assets/sliders/images/ecall.svg';
import VideoIcon from '../../assets/sliders/images/evideo.svg';
import ChatIcon from '../../assets/sliders/images/chat.svg';
import Arrow from '../../assets/sliders/images/arrow5.svg';
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
                <TouchableOpacity onPress= {()=> props.navigation.navigate('WaitingRoom', {chat_id: 1})}>
                    <ProfileCard>
                        <View>
                            <VideoIcon width= {30} height= {30} />
                        </View>
                        <View style= {styles.textContainer}>
                        <MyAppText style= {styles.textStyle2}>Video</MyAppText>
                        </View>
                        <View>
                            <Arrow width= {30} height= {30} />
                        </View>
                    </ProfileCard>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=> props.navigation.navigate('WaitingRoom', {chat_id:3})}>
                    <ProfileCard>
                        <View>
                            <ChatIcon width= {30} height= {30} />
                        </View>
                        <View style= {styles.textContainer}>
                        <MyAppText style= {styles.textStyle2}>Chat</MyAppText>
                        </View>
                        <View>
                            <Arrow width= {30} height= {30} />
                        </View>
                    </ProfileCard>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=> props.navigation.navigate('WaitingRoom', {chat_id:2})}>
                    <ProfileCard>
                        <View>
                            <PhoneIcon width= {30} height= {30} />
                        </View>
                        <View style= {styles.textContainer}>
                        <MyAppText style= {styles.textStyle2}>Voice</MyAppText>
                        </View>
                        <View>
                            <Arrow width= {30} height= {30} />
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
        alignItems: 'center',
        marginVertical: 25
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
        fontSize: 18,
        textAlign: 'left'
    },
    textContainer: {
        backgroundColor: 'white',
        width: '60%'
    }
});

export default Emergency