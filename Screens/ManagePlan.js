import React from 'react';
import { View, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import UploadIcon4 from '../assets/sliders/images/subscription.svg';
import UploadIcon5 from '../assets/sliders/images/history.svg';
import MyAppText from '../Components/MyAppText';

const ManagePlan = (props) => {
    return (
        <ScrollView style= {styles.container}>
                    <TouchableOpacity onPress= {() => props.navigation.navigate('Selfpay') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon4 width= {120} height= {80} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Subscription
                            </MyAppText>
                            {/* <MyAppText style= {styles.colorText}>Continue */}
                                {/* <Keyback width= {15} height= {15} /> */}
                            {/* </MyAppText> */}
                        </View>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => props.navigation.navigate('SubHistory') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon5 width= {120} height= {80} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Subscription History
                            </MyAppText>
                            {/* <MyAppText style= {styles.colorText}>Continue */}
                                {/* <Keyback width= {15} height= {15} /> */}
                            {/* </MyAppText> */}
                        </View>
                    </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F7F7FA',
      padding: 25,
      paddingVertical: 55
  },
  textCont: {
      width: '50%'
  },
  firstContainer: {
      alignItems: 'center'
  },
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      marginVertical: 20,
      marginHorizontal: 10,
      fontSize: 30
  },
  textStyle2: {
      color: '#9B9B9B',
      textAlign: 'center',
      marginBottom: 25
  },
  boldText: {
      fontWeight: 'bold',
      fontSize: 20
  },
  imageStyle: {
      width: 100,
      height: 110
  },
  colorText: {
      color: '#6C0BA9'
  },
  card: {
      backgroundColor: 'white',
      minHeight: 120,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 30,
      marginBottom: 20,
      shadowColor: "#1F1F1F1F",
      shadowOffset: {
          width: 5,
          height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 3.84,
  
      elevation: 5,
  },
  });

export default ManagePlan;