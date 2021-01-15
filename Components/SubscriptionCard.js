import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MyAppText from './MyAppText';

const SubscriptionCard = (props) => {
    const styles = StyleSheet.create({
        container : {
            marginBottom: 15,
            backgroundColor: 'white',
            minHeight: 50,
            padding: 20,
            borderWidth: 1,
            borderColor: '#E8E8E8',
            borderRadius: 5,
            shadowColor: "#1F1F1F1F",
            shadowOffset: {
                width: 5,
                height: 5,
            },
            shadowOpacity: 1,
            shadowRadius: 3.84,
    
            elevation: 5,
        },
        opacity: {
            opacity: 0.5
        },
        flexContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5
          
        },
        alignTextRight: {
            textAlign: 'right'
        },
        textStyle: {
            // marginVertical: 15
        },
        fontColor: {
            color: props.color
        }
        
    });
    return (
        <View style= {styles.container}>
            <View style= {styles.flexContainer}>
                <View>
                    <MyAppText  style= {{...styles.textStyle, ...styles.opacity}}>Date:</MyAppText>
                    <MyAppText  style= {styles.textStyle}>
                        {props.date}
                    </MyAppText>
                </View>
                <View>
                    <MyAppText style= {{...styles.textStyle2, ...styles.opacity, ...styles.alignTextRight}}>Amount:</MyAppText>
                    <MyAppText style= {{...styles.textStyle2, ...styles.alignTextRight}}>
                        {`₦${props.amount}`}
                    </MyAppText>
                </View>
            </View>
            <View style= {styles.flexContainer}>
            <View>
                    <MyAppText  style= {{...styles.textStyle, ...styles.opacity}}>Plan:</MyAppText>
                    <MyAppText  style= {styles.textStyle}>
                      {props.plan}
                    </MyAppText>
                </View>
                <View>
                    <MyAppText style= {{...styles.textStyle2, ...styles.opacity, ...styles.alignTextRight}}>Status:</MyAppText>
                    <MyAppText style= {{...styles.textStyle2, ...styles.alignTextRight, ...styles.fontColor}}>
                       {props.status}
                    </MyAppText>
                </View>
            </View>
        </View>
    )
}


export default SubscriptionCard