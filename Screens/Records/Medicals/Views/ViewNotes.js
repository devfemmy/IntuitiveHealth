import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MyAppText from '../../../../Components/MyAppText';
import ProfileCard from '../../../../Components/ProfileCard';

const ViewNotes = (props) => {
    const {recommendation, notes, date, name} = props.route.params;
    return (
        <ScrollView style= {styles.container}>
                <View>
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
                                            {name}
                                        </MyAppText>
                                    </View>
                            </ProfileCard>
                            <View style= {styles.noteContainer}>
                                <MyAppText style= {styles.label}>Doctor's Comment</MyAppText>
                                <ProfileCard>
                                    <MyAppText>
                                        {notes}
                                    </MyAppText>
                                </ProfileCard>
                            </View>
                            <View style= {styles.noteContainer}>
                                <MyAppText style= {styles.label}>Doctor's Recommendation</MyAppText>
                                <ProfileCard>
                                    <MyAppText>
                                        {recommendation}
                                    </MyAppText>
                                </ProfileCard>
                            </View>
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
    noteContainer: {
        marginVertical: 10
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

export default ViewNotes