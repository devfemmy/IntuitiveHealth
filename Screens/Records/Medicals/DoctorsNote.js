import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DoctorCard from '../../../Components/DoctorCard';
import MyAppText from '../../../Components/MyAppText';
import ProfileCard from '../../../Components/ProfileCard';


const DoctorsNote = (props) => {
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
                            <MyAppText>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                            </MyAppText>
                            <MyAppText style= {styles.docText}>
                                Dr Doctor Joe
                            </MyAppText>
                        </View>
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
    content: {
        color: '#2E2E2E'
    },
    textRight: {
        textAlign: 'right'
    }
});

export default DoctorsNote