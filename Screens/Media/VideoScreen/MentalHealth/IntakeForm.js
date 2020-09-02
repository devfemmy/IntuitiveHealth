import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProfileInput from '../../../../Components/ProfileInput';
import InnerBtn from '../../../../Components/InnerBtn';

const IntakeForm = (props) => {
    return (
        <ScrollView style= {styles.container}>
        <View>
            <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View>
            <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View>
            <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View>
            <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View>
            <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View>
            <View style= {styles.btnContainer}>
                    <InnerBtn onPress= {() => props.navigation.navigate('Slot')} text= "Continue" color= "white" bg= "#51087E" />
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 20
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnContainer: {
        marginVertical: 50
    }
});

export default IntakeForm