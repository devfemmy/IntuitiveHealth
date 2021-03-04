import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';
import ProfileInput from '../../Components/ProfileInput';

const OpinionTitle = (props) => {

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const skipDocuments = () => {
        if (title === '' || comment === '') {
            alert('Please fill form correctly!')
        } else {
            props.navigation.navigate('Summary', {
                title: title, comment: comment,  summary_id: 2
            })
        }
    }

    const includeDocuments = () => {
        if (title === '' || comment === '') {
            alert('Please fill form correctly!')
        } else {
            props.navigation.navigate('Select Documents', {
                title: title, comment: comment
            })
        }
    }

    return (
        <View style= {styles.container}>
            <ScrollView>
                <View style= {styles.lowerContainer}>
                    <ProfileInput onChangeText = {(value) => setTitle(value)}  value= {title}  label= "Title:" />
                    <ProfileInput onChangeText = {(value) => setComment(value)}  value= {comment} label= "Comment:" lines= {5} multiline= {true} />
                    <MyAppText style= {styles.textStyle} onPress= {includeDocuments}>
                       Click here to include Documents
                    </MyAppText>
                </View>
            </ScrollView>
            <View style= {styles.footer}>
            <InnerBtn onPress= {skipDocuments} width= "100%" text= "Skip Documents" color= "white" bg= "#51087E" />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
    },
    lowerContainer: {
        padding: 25
    },
    footer: {
        minHeight: 100,
        backgroundColor: 'white',
        paddingHorizontal: 25
    },
    textStyle: {
        marginVertical: 10,
        textAlign: 'center',
        color: '#51087E',
        fontWeight: 'bold'
    }
});

export default OpinionTitle