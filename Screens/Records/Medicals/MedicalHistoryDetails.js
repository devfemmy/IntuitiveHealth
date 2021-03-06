import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DoctorCard from '../../../Components/DoctorCard';
import MyAppText from '../../../Components/MyAppText';
import ProfileCard from '../../../Components/ProfileCard';
import SlotIconText from '../../../Components/SlotIconText';
import Icon1 from '../../../assets/sliders/images/icon1.svg';
import Icon2 from '../../../assets/sliders/images/icon2.svg';
import Icon3 from '../../../assets/sliders/images/icon3.svg';
import Icon4 from '../../../assets/sliders/images/icon4.svg';
import Arrow from '../../../assets/sliders/images/arrow.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';

const MedicalHistoryDetails = (props) => {
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
                    <MyAppText  style= {{...styles.label, ...styles.textRight}}>
                        Date and Time
                    </MyAppText>
                    <MyAppText style= {styles.content}>
                    20 Jul, 2020 1:00am
                    </MyAppText>
                </View>
            </View>
            <View style= {styles.flexContainer}>
                <View style= {styles.textContainer}>
                    <MyAppText style= {styles.label}>
                        Patient ID
                    </MyAppText>
                    <MyAppText style= {styles.content}>
                    MRPP00000001
                    </MyAppText>
                </View>
                <View style= {styles.textContainer}>
                    <MyAppText style= {styles.label}>
                        Visit ID
                    </MyAppText>
                    <MyAppText style= {styles.content}>
                    INTE30
                    </MyAppText>
                </View>
            </View>
            <View style= {styles.flexContainer}>
                <View style= {styles.textContainer}>
                    <MyAppText style= {styles.label}>
                        Booked for
                    </MyAppText>
                    <MyAppText style= {styles.content}>
                    John Doe
                    </MyAppText>
                </View>
                <View style= {styles.textContainer}>
                    <MyAppText style= {styles.label}>
                        Phone Number
                    </MyAppText>
                    <MyAppText style= {styles.content}>
                    +234 812 345 6789
                    </MyAppText>
                </View>
            </View>
            <View  style= {styles.lowerContainer}>
                    <TouchableOpacity onPress= {()=>props.navigation.navigate('DoctorsNote')}>
                        <ProfileCard>
                            <SlotIconText size= {19} icon= {<Icon3 width= {30} height= {30} />} text= "Doctor Note" />
                            <Arrow width= {30} height= {30} />
                        </ProfileCard>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {()=>props.navigation.navigate('Medications')}>
                        <ProfileCard>
                            <SlotIconText size= {19} icon= {<Icon4 width= {30} height= {30} />} text= "Medications" />
                            <Arrow width= {30} height= {30} />
                        </ProfileCard>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {()=>props.navigation.navigate('DoctorsVitals')}>
                        <ProfileCard>
                            <SlotIconText size= {19} icon= {<Icon2 width= {30} height= {30} />} text= "Vitals" />
                            <Arrow width= {30} height= {30} />
                        </ProfileCard>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {()=>props.navigation.navigate('Document')}>
                        <ProfileCard>
                            <SlotIconText size= {19} icon= {<Icon1 width= {30} height= {30} />} text= "Document" />
                            <Arrow width= {30} height= {30} />
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
    imageContainer: {
        padding: 20,
        backgroundColor: '#F7F7FA',
    },
    flexContainer: {
        backgroundColor: '#F7F7FA',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E6EAF0',
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

export default MedicalHistoryDetails