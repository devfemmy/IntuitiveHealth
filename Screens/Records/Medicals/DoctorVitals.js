import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DoctorCard from '../../../Components/DoctorCard';
import MyAppText from '../../../Components/MyAppText';
import ProfileCard from '../../../Components/ProfileCard';


const DoctorsVitals = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.imageContainer}>
                <DoctorCard 
                college= "Obstetricians/Gynecologists"
                experience= "23 years experience overall"
                image= {require('../../../assets/sliders/images/doctor.png')}
                name= "Dr Jonathan Doe" />
            </View>
            <View style= {styles.flexContainer}>
                <View style= {styles.textContainer}>
                    <MyAppText style= {styles.label}>
                        Type
                    </MyAppText>
                    <MyAppText style= {styles.content}>
                    Virtual (General Practice)
                    </MyAppText>
                </View>
                <View style= {styles.textContainer}>
                    <MyAppText style= {{...styles.label, ...styles.textRight}}>
                        Date and Time
                    </MyAppText>
                    <MyAppText style= {styles.content}>
                    20 Jul, 2020 1:00am
                    </MyAppText>
                </View>
            </View>
            <View style= {styles.noteContainer}>
                        <ProfileCard>
                                <View>
                                    <MyAppText style= {styles.label}>
                                        Pulse Rate
                                    </MyAppText>
                                </View>
                                    <MyAppText>
                                        <MyAppText style= {styles.label3}>
                                            34
                                        </MyAppText>
                                        <MyAppText style= {styles.label2}>
                                            (high)
                                        </MyAppText>
                                    </MyAppText>
                        </ProfileCard>
                        <ProfileCard>
                                <View>
                                    <MyAppText style= {styles.label}>
                                        Respiratory Rate
                                    </MyAppText>
                                </View>
                                    <MyAppText>
                                        <MyAppText style= {styles.label3}>
                                            34
                                        </MyAppText>
                                        <MyAppText style= {styles.label2}>
                                            (high)
                                        </MyAppText>
                                    </MyAppText>
                        </ProfileCard>
                        <ProfileCard>
                                <View>
                                    <MyAppText style= {styles.label}>
                                        Blood Pressure
                                    </MyAppText>
                                </View>
                                    <MyAppText>
                                        <MyAppText style= {styles.label3}>
                                            34
                                        </MyAppText>
                                        <MyAppText style= {styles.label5}>
                                            (Normal)
                                        </MyAppText>
                                    </MyAppText>
                        </ProfileCard>
                        <ProfileCard>
                                <View>
                                    <MyAppText style= {styles.label}>
                                        Temperature
                                    </MyAppText>
                                </View>
                                    <MyAppText>
                                        <MyAppText style= {styles.label3}>
                                            24
                                        </MyAppText>
                                        <MyAppText style= {styles.label4}>
                                            (Low)
                                        </MyAppText>
                                    </MyAppText>
                        </ProfileCard>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
       
    },
    imageContainer: {
        padding: 20,
        backgroundColor: '#F7F7FA',
    },
    docText: {
        opacity: 0.5,
        fontSize: 17,
        marginVertical: 5
    },
    noteContainer: {
        margin: 20
    },
    flexContainer: {
        backgroundColor: '#F7F7FA',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E6EAF0',
        borderBottomWidth: 1,
        borderBottomColor: '#E6EAF0',
        padding: 20,

    },
    lowerContainer: {
        padding: 20
    },
    label: {
        color: '#BBC2CC'
    },
    label2: {
        color: '#D30C0C'
    },
    label4: {
        color: '#E6C300'
    },
    label5: {
        color: '#58C315'
    },
    content: {
        color: '#2E2E2E',
        textAlign: 'right'
    },
    textRight: {
        textAlign: 'right'
    }
    
});

export default DoctorsVitals;