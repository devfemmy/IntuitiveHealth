import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Keyback from '../../../assets/sliders/images/keyback.svg';
import MyAppText from '../../../Components/MyAppText';
import ResumeIcon from '../../../assets/sliders/images/resume.svg';
import UploadIcon from '../../../assets/sliders/images/upload.svg';
import MedIcon from '../../../assets/sliders/images/medycon.svg';

const MedicalRecords = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.firstContainer}>
                    <MedIcon width= {280} height= {280} />
                    <MyAppText style= {styles.textStyle2}>
                    A detailed health history helps a doctor diagnose you better.
                    </MyAppText>
            </View>
                <View>
                <TouchableOpacity onPress= {() => props.navigation.navigate('History')}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <ResumeIcon width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Medical History
                            </MyAppText>
                            <MyAppText style= {styles.colorText}>Continue
                                {/* <Keyback width= {15} height= {15} /> */}
                            </MyAppText>
                        </View>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Upload') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Document Upload
                            </MyAppText>
                            <MyAppText style= {styles.colorText}>Continue
                                {/* <Keyback width= {15} height= {15} /> */}
                            </MyAppText>
                        </View>
                    </View>
            </TouchableOpacity>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 25
    },
    textCont: {
        width: '50%'
    },
    firstContainer: {
        alignItems: 'center'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 20,
        marginHorizontal: 10,
        fontSize: 30
    },
    textStyle2: {
        color: '#9B9B9B',
        textAlign: 'center',
        marginBottom: 25
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

export default MedicalRecords