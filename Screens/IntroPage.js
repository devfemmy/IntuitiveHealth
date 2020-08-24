import React from 'react';
import { ScrollView, View, Text, 
    TouchableOpacity,Image,
    Dimensions, ImageBackground, StyleSheet } from 'react-native';
import MyAppText from '../Components/MyAppText';

const IntroPage = (props) => {
    return (
        <ScrollView>
            <View>
            <ImageBackground source= {require('../assets/sliders/sliders/slider4.png')}
                style= {styles.sliderImg2}
                >
                <View>
                    <MyAppText style= {styles.headerStyle}>How would you like to login?</MyAppText>
                    <MyAppText style= {styles.textStyle2}>Kindly select from the login option below to continue</MyAppText>
                </View>
                <View style= {styles.cardContainer}>
                    <TouchableOpacity onPress= {() => alert('This option is not yet available')}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <Image style= {styles.imageStyle} source= {require('../assets/sliders/images/imageicon2.png')} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>Self Pay</MyAppText>
                            <MyAppText style= {styles.colorText}>Continue</MyAppText>
                        </View>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {() => props.navigation.navigate('Hmo')}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <Image style= {styles.imageStyle} source= {require('../assets/sliders/images/imageicon.png')} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>HMO Member/Corporate
                            </MyAppText>
                            <MyAppText style= {styles.colorText}>Continue</MyAppText>
                        </View>
                    </View>
                    </TouchableOpacity>

                </View>
                   
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textCont: {
        width: '50%'
    },
    textStyle: {
        fontSize: 17,
        color: 'white',
        marginHorizontal: 50,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    colorText: {
        color: '#6C0BA9'
    },
    boldText: {
        fontSize: 18,
        marginBottom: 3,
        fontWeight: 'bold'
    },
    imageStyle: {
        width: 100,
        height: 110
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
    },
    textStyle2: {
        fontSize: 16,
        color: '#9B9B9B',
        marginVertical: 20,
    },
    headerStyle: {
        fontSize: 27,
        color: '#51087E',
        fontWeight: 'bold'
    },
    lowerContainer: {
       height: Dimensions.get('window').height/2.5,
       display: 'flex',
       justifyContent: 'space-around'
    },
    sliderImg: {
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        // resizeMode: 'contain'
      
    },
    sliderImg2: {
        paddingVertical: 120,
        paddingHorizontal: 50,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      
    },
})

export default IntroPage;