import React, {  useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ErrorOverLay from '../../Components/ErrorOverlay';
import { Overlay } from 'react-native-elements';

const ErrorPage = (props) => {
    const [visible, setVisible] = useState(false);
    const {message} = props.route.params;

    const toggleOverlay = () => {
        setVisible(true);
        // setTimeout(function(){ moveToHome() }, 1500);
        
      };

      useEffect(() => {
        toggleOverlay()
      }, [])

    const moveToHome = () => {
        setVisible(false)
        props.navigation.goBack();
    }
    
    return (
        <ScrollView style= {styles.container}>
            <Overlay isVisible={visible} onBackdropPress={moveToHome}>
                <ErrorOverLay message= {message} />
            </Overlay>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1
    }
});

export default ErrorPage;