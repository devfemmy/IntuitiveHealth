import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InnerBtn from '../../Components/InnerBtn';
import ProfileInput from '../../Components/ProfileInput';

const OpinionTitle = (props) => {

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('')

    return (
        <View style= {styles.container}>
            <ScrollView>
                <View style= {styles.lowerContainer}>
                    <ProfileInput onChangeText = {(value) => setTitle(value)}  value= {title}  label= "Title" />
                    <ProfileInput onChangeText = {(value) => setComment(value)}  value= {comment} label= "Comment" line= {4} multiline= {true} />
                </View>
            </ScrollView>
            <View style= {styles.footer}>
            <InnerBtn onPress= {() => props.navigation.navigate('Upload')} width= "100%" text= "Next" color= "white" bg= "#51087E" />
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
    }
});

export default OpinionTitle