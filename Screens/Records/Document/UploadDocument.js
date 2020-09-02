import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DocumentIcon from '../../../assets/sliders/images/document.svg';
import MyAppText from '../../../Components/MyAppText';
import InnerBtn from '../../../Components/InnerBtn';
const UploadDocument = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.upperContainer}>
                    <DocumentIcon width= {280} height= {200} />
                    <MyAppText style= {styles.textStyle}>You do not have any document here</MyAppText>
            </View>
            <View style= {styles.btnContainer}>
                <InnerBtn bg= "#51087E" color= "white" text= "Upload Document" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    upperContainer: {
        margin: 25,
        alignItems: 'center'
    },
    btnContainer: {
        margin: 20,
        marginVertical: 40
    },
    textStyle: {
        color: '#9B9B9B',
        marginVertical: 50
    }
});

export default UploadDocument