import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../../../assets/sliders/images/doc2.svg';
import Icon2 from '../../../assets/sliders/images/doc.svg';
import MyAppText from '../../../Components/MyAppText';
import Keyback from '../../../assets/sliders/images/keyback.svg';
const FindConsult = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <MyAppText style= {styles.textStyle}>
            What kind of consultation do you want?
            </MyAppText>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Practise', {name: 'General Practice', id: 1})}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <Icon width= {120} height= {120} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                General Practice
                            </MyAppText>
                            <MyAppText style= {styles.colorText}>Continue
                                {/* <Keyback width= {18} height= {18} /> */}
                            </MyAppText>
                        </View>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Mental')}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <Icon2 width= {120} height= {120} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Mental Health Specialist
                            </MyAppText>
                            <MyAppText style= {styles.colorText}>Continue
                            {/* <Keyback width= {15} height= {15} /> */}
                            </MyAppText>
                        </View>
                    </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#51087E',
        padding: 20,
        paddingHorizontal: 30
    },
    textCont: {
        width: '50%'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 20,
        marginHorizontal: 10,
        fontSize: 30
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    imageStyle: {
        width: 100,
        height: 110
    },
    colorText: {
        color: '#6C0BA9'
    },
    card: {
        backgroundColor: 'white',
        minHeight: 120,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
        marginBottom: 20,
    },
});

export default FindConsult