import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../../Navigations/DrawerNav';

const ExpiredToken = (props) => {
    const {signOut} = useContext(AuthContext);

    useEffect(() => {
        signOut()
    }, []);
    
    return (
        <ScrollView style= {styles.container}>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1
    }
});

export default ExpiredToken