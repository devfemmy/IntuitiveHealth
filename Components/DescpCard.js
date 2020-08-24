import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyAppText from './MyAppText';

const DescriptionCard = (props) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            minHeight: 235,
            maxHeight: 235,
            paddingBottom: 20,
            minWidth: 150,
            maxWidth: 170,
            marginVertical: 20,
            marginRight: 15,
       
        },
        imageContainer: {
            marginVertical: 15,
            marginTop: 0,
            paddingBottom: 24,
            borderBottomWidth: 3,
            borderBottomColor: '#F7F7FA',
            alignItems: 'center'
        },
        imageStyle: {
            width: 80,
            height: 80,
            resizeMode: 'contain'
        },
        textContainer: {
            paddingHorizontal: 10
        },
        textStyle: {
            color: 'black',
            fontWeight: 'bold'
        },
        textStyle2: {
           color: '#9B9B9B',
           marginVertical: 2
        },
        textStyle3: {
            color: '#6C0BA9',
            fontWeight: 'bold',
            marginBottom: 10
        }

    })
    return (
        <View>
            <TouchableOpacity onPress= {props.onPress}>
            <View style= {styles.container}>
            <View style= {styles.imageContainer}>
                    <Image style= {props.thumbimg} source= {props.source} />
            </View>
            <View style= {styles.textContainer}>
            <MyAppText style= {styles.textStyle}>{props.name}</MyAppText>
            <MyAppText  style= {styles.textStyle2}>{props.title}</MyAppText>
            <MyAppText  style= {styles.textStyle3}>{props.consult}</MyAppText>
            </View>
            
            </View>
            </TouchableOpacity>
        </View>

    )
}

export default DescriptionCard;

