import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

const VirtualCall = () => {
    return (
        <ScrollView style= {styles.container}>
            <Text>Virtual Call</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    }
});

export default VirtualCall