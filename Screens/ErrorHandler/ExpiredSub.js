import React from 'react';
import { Dimensions } from 'react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import WarningIcon from '../../assets/sliders/images/warning.svg';
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';

const ExpiredSubscription = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.floatContainer}>
                <WarningIcon width= {150} height= {120} />
                <MyAppText style= {styles.textStyle}>
                    HMO Subscription Expired
                </MyAppText>
                <MyAppText style= {{opacity: 0.5, textAlign: 'center', marginHorizontal: 10}}>
                    Your HMO subscription has expired. Kindly contact your HMO provider
                </MyAppText>
            </View>
            <View>
                <InnerBtn
                onPress = {() => props.navigation.popToTop()}
                border= "#51087E" 
                color= "white"
                text= "Back to Home" bg= "#51087E" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 25,
        flex: 1
    },
    floatContainer: {
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height/1.7
    },
    textStyle: {
        color: '#51087E',
        fontSize: 18,
        marginVertical: 10
    }
});

export default ExpiredSubscription