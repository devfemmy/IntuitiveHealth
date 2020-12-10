import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DoctorCard from '../../../../Components/DoctorCard';
import MyAppText from '../../../../Components/MyAppText';
import ProfileCard from '../../../../Components/ProfileCard';
// import DoctorCard from '../../../Components/DoctorCard';
// import MyAppText from '../../../Components/MyAppText';
// import ProfileCard from '../../../Components/ProfileCard';


const ViewVitals = (props) => {
    const {num, deno, temperature, pulse, respiratory, date, time} = props.route.params;
    return (
        <ScrollView style= {styles.container}>
                     <ProfileCard>
                                <View style= {styles.textContainer}>
                                        <MyAppText style= {styles.label}>
                                            Date
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                            {date.slice(0, 10)}
                                        </MyAppText>
                                    </View>
                                    <View style= {styles.textContainer}>
                                        <MyAppText style= {{...styles.label, ...styles.textRight}}>
                                            By
                                        </MyAppText>
                                        <MyAppText style= {styles.content}>
                                            {time}
                                        </MyAppText>
                                    </View>
                    </ProfileCard>           
            <View style= {styles.noteContainer}>
                        <ProfileCard>
                                <View>
                                    <MyAppText style= {styles.label}>
                                        Pulse Rate
                                    </MyAppText>
                                </View>
                                    <MyAppText>
                                        <MyAppText style= {styles.label3}>
                                            {pulse}
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
                                            {respiratory}
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
                                           {`${num}/${deno}`}
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
                                          {temperature}
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
        margin: 25
       
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
    noteContainer: {
        marginVertical: 25
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

export default ViewVitals;