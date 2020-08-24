import React from 'react';
import { View, StyleSheet,Text, ScrollView, Image, Platform } from 'react-native';
import DoctorCard from '../../../Components/DoctorCard';
import IconText from '../../../Components/IconText';
import VoiceIcon from '../../../assets/sliders/images/vchat.svg';
import SchoolIcon from '../../../assets/sliders/images/school.svg';
import SlotBtn from '../../../Components/SlotBtn';
import MyAppText from '../../../Components/MyAppText';
import SlotIconText from '../../../Components/SlotIconText';
import Icon from 'react-native-vector-icons/Ionicons';
import SlotPicker from '../../../Components/SlotPicker';
import { useLinkProps } from '@react-navigation/native';

const TimeSlot = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.first}>
                <DoctorCard 
                image= {require('../../../assets/sliders/images/doctor.png')}
                college= "Primary care"
                name= "Dr. Jonathan Emmanuel" 
                experience= "23 years experience overall" />
                <IconText
                size= {14}
                width= "49%"
                paddingBottom= {10}
                color= "#9B9B9B" 
                icon= {<VoiceIcon width= {20} height= {20} />}
                text= "English, Yoruba, Hausa" />
                <IconText
                 size= {14}
                width= "25%"
                paddingBottom= {10}
                color= "#9B9B9B" 
                icon= {<SchoolIcon width= {20} height= {20} />}
                text= "MBBS, MS" />
            </View>
            <View>
                <ScrollView  style= {styles.secondCont} horizontal>
                    <SlotBtn 
                    date= "Today, 19 Jul"
                     name= "No Slot Available"
                    border= "#BBC2CC"
                    style2= {styles.textStyle2}
                        style1= {styles.textStyle} />
                        <SlotBtn
                        date= "Tomorrow, 20 Jul"
                         name= "16 Slots Available" 
                          border= "#A884BF"
                        style2= {styles.textStyle1}
                        style1= {styles.textStyle} />
                        <SlotBtn
                         date= "Today, 19 Jul" 
                         name= "Slot Available"
                          border= "#BBC2CC"
                        style2= {styles.textStyle2}
                        style1= {styles.textStyle} />
                    <SlotBtn
                        date= "Tomorrow, 20 Jul"
                        name= "16 Slots Available"
                        border= "#A884BF"
                        style2= {styles.textStyle1}
                        style1= {styles.textStyle} />
                </ScrollView>
            </View>
            <View style= {styles.bottomContainer}>
                <MyAppText style= {styles.textStyle4}>Tomorrow 20, July</MyAppText>
            </View>
            <View style= {styles.slotContainer}>
            <SlotIconText
             text= "Morning"
             slot= "3 Slots"
             textColor= "#BBC2CC"
             paddingBottom= {10}
             icon= { <Icon
                size={22}
                color= "#94969D"
                name={Platform.OS === 'android' ? 'md-partly-sunny' : 'ios-partly-sunny'}></Icon>}
            />
            <View style= {styles.flexContainer}>
            <SlotPicker onPress = {()=> props.navigation.navigate('Patient')} color= "white" bg= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
            </View>
            </View>
            {/* second slot */}
            <View style= {styles.slotContainer}>
            <SlotIconText
             text= "Afternoon"
             slot= "3 Slots"
             textColor= "#BBC2CC"
             paddingBottom= {10}
             icon= { <Icon
                size={22}
                color= "#94969D"
                name={Platform.OS === 'android' ? 'md-sunny' : 'ios-sunny'}></Icon>}
            />
            <View style= {styles.flexContainer}>
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
            </View>
            </View>
            <View style= {styles.slotContainer}>
            <SlotIconText
             text= "Evening"
             slot= "3 Slots"
             textColor= "#BBC2CC"
             paddingBottom= {10}
             icon= { <Icon
                size={22}
                color= "#94969D"
                name={Platform.OS === 'android' ? 'md-moon-outline' : 'ios-moon-outline'}></Icon>}
            />
            <View style= {styles.flexContainer}>
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
            </View>
            </View>
            <View style= {styles.slotContainer}>
            <SlotIconText
             text= "Night"
             slot= "3 Slots"
             textColor= "#BBC2CC"
             paddingBottom= {10}
             icon= { <Icon
                size={22}
                color= "#94969D"
                name={Platform.OS === 'android' ? 'md-moon' : 'ios-moon'}></Icon>}
            />
            <View style= {styles.flexContainer}>
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
                <SlotPicker border= "#51087E" color= "#51087E" time= "9:30am" />
            </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        fontFamily: 'HammersmithOne-Regular',
    },
    first: {
        padding: 25
    },
    doctorContainer: {

    },
    flexContainer: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        // alignItems: 'flex-start',
        overflow: 'visible',
    },
    textStyle4: {
        textAlign: 'center',
        fontSize: 18
    },
    textStyle: {
        fontWeight: 'bold'
    },
    textStyle1: {
       color: '#880ED4'
    },
    textStyle2: {
        fontWeight: '100',
        opacity: 0.3
    },
    secondCont: {
     backgroundColor: '#E6EAF0',
     display: 'flex',
     flexDirection: 'row',
     minHeight: 95,
     padding: 15
    },
    imageStyle: {
        width: 50,
        height: 50,
        resizeMode: 'cover'
    },
    bottomContainer: {
        marginVertical: 30
    },
    slotContainer: {
       borderTopColor: '#E6EAF0',
       borderTopWidth: 1,
       marginHorizontal: 25,
       paddingVertical: 15
    }
});

export default TimeSlot;