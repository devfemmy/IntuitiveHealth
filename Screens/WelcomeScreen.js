import React from 'react';
import { View, StyleSheet, 
    ScrollView, ImageBackground, 
    Text, Dimensions, 
    TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = (props) => {
    return (
        <View style = {styles.container}>
            <ScrollView horizontal={true} pagingEnabled={true}>
                <ImageBackground source= {require('../assets/sliders/sliders/slider.png')}
                style= {styles.sliderImg}
                >
                  <View style= {styles.lowerContainer}>
                        <Text style= {styles.textStyle}>Book an appointment with the right doctor</Text>
                        <View style= {styles.btnOuterContainer}>
                            <TouchableOpacity style= {styles.btnContainer}>
                            <Text>GET STARTED</Text>
                            </TouchableOpacity>
                        </View>

                  </View>
                </ImageBackground>
                <ImageBackground source= {require('../assets/sliders/sliders/slider2.png')}
                style= {styles.sliderImg}
                >
                        <View style= {styles.lowerContainer}>
                        <Text style= {styles.textStyle}>Get virtual consultation online with doctors on the go.</Text>
                        <View style= {styles.btnOuterContainer}>
                            <TouchableOpacity style= {styles.btnContainer}>
                            <Text>GET STARTED</Text>
                            </TouchableOpacity>
                        </View>

                  </View>
                </ImageBackground>
                <ImageBackground source= {require('../assets/sliders/sliders/slider3.png')}
                style= {styles.sliderImg}
                >
                        <View style= {styles.lowerContainer}>
                        <Text style= {styles.textStyle}>Keep you medical record history handy.</Text>
                        <View style= {styles.btnOuterContainer}>
                            <TouchableOpacity style= {styles.btnContainer}>
                            <Text>GET STARTED</Text>
                            </TouchableOpacity>
                        </View>

                  </View>
                </ImageBackground>
                <ImageBackground source= {require('../assets/sliders/sliders/slider4.png')}
                style= {styles.sliderImg2}
                >
                <View>
                    <Text style= {styles.headerStyle}>How would you like to login?</Text>
                    <Text style= {styles.textStyle2}>Kindly select from the login option below to continue</Text>
                </View>
                <View style= {styles.cardContainer}>
                    <TouchableOpacity>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <Image style= {styles.imageStyle} source= {require('../assets/sliders/images/imageicon2.png')} />
                        </View>
                        <View style= {styles.textCont}>
                            <Text style= {styles.boldText}>As an Individual</Text>
                            <Text style= {styles.colorText}>Continue</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <Image style= {styles.imageStyle} source= {require('../assets/sliders/images/imageicon.png')} />
                        </View>
                        <View style= {styles.textCont}>
                            <Text style= {styles.boldText}>As An 
                            HMO Customer
                            </Text>
                            <Text style= {styles.colorText}>Continue</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                </View>
                   
                </ImageBackground>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: 'white'
    },
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
        height: 120
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
        color: '#A884BF',
        marginVertical: 20,
    },
    headerStyle: {
        fontSize: 25,
        color: 'white',
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
      
    },
    sliderImg2: {
        paddingVertical: 120,
        paddingHorizontal: 50,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      
    },
    btnOuterContainer: {
        marginHorizontal: 40
    },
    btnContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#51087E',
        fontWeight: 'bold',
        fontSize: 35,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default WelcomeScreen