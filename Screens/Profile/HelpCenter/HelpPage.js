import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
// import InnerBtn from '../../Components/InnerBtn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UploadIcon from '../../../assets/sliders/images/faq2.svg';
import UploadIcon2 from '../../../assets/sliders/images/profile2.svg';
import UploadIcon3 from '../../../assets/sliders/images/faq.svg';
import MyAppText from '../../../Components/MyAppText';

const HelpPage = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Contact') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon3 width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Contact Us
                            </MyAppText>

                        </View>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Faqs') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                FAQs
                            </MyAppText>

                        </View>
                    </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7FA',
    padding: 25
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

export default HelpPage;