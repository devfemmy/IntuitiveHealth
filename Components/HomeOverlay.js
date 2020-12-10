import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../assets/sliders/images/homeicon.svg';
import InnerBtn from './InnerBtn';
import MyAppText from './MyAppText';

const HomeOverlay = (props) => {
    return (
        <View style= {styles.container}>
            <MyAppText onPress= {props.pressed}  style= {styles.closeText}>X Close</MyAppText>
            <View style= {{alignItems: 'center'}}>
                <Icon width= {280} height= {150} />
            </View>
            <MyAppText style= {styles.textSyle}>
            {props.welcome} {props.name},
            </MyAppText>
            <MyAppText style={styles.textSyle2}>
            this is your conduit to a healthier life
            </MyAppText>
            {/* <View>
                {props.children}
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 300,
        width: '100%',
        // alignItems: 'center'
    },
    closeText: {
        fontSize: 20,
        textAlign: 'right',
        position: 'relative',
        top: -10,
        right: -3
    },
    textSyle: {
        fontSize: 21,
        marginVertical: 10,
        textAlign: 'center',
        color: '#51087E'
    },
    textSyle2: {
       color: '#9B9B9B',
       marginHorizontal: 15
    },

})

export default HomeOverlay;