import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import DescriptionCard from '../Components/DescpCard';

const HomeScreen = () => {
    return (
        <ScrollView style= {styles.container}>
        <TouchableOpacity>
        <View style= {styles.firstCont}>
                <Image
                style= {styles.imageStyle} 
                source= {require('../assets/sliders/images/thumb1.png')} />
                <View>
                    <Text style= {styles.textStyle1}>Johnathan Doe</Text>
                    <Text style= {styles.textStyle2}>View and edit profile</Text>
                    <Text style= {styles.textStyle3}>100% complete</Text>
                </View>
                <Image
                style= {styles.imageStyle2} 
                source= {require('../assets/sliders/images/navright.png')} />
           </View>
        </TouchableOpacity>
        <View style= {styles.secondCont}>
            <TouchableOpacity>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <Image style= {styles.imageStyle3} source= {require('../assets/sliders/images/imageicon2.png')} />
                        </View>
                        <View style= {styles.textContainer}>
                            <Text style= {styles.boldText}>Find a doctor</Text>
                            <Text style= {styles.textStyle4}>Get virtual consultation online with doctors on the go.</Text>
                            <Text style= {styles.textStyle2}>Find Doctor</Text>
                        </View>
                    </View>
            </TouchableOpacity>
        </View>
        <View style= {styles.lowerContainer}>
            <View style= {styles.pageDesc}>
                <Text style= {{...styles.bolderText, ...styles.textColor}}>Doctors You Have Contacted</Text>
                <Text style= {{...styles.bolderText, ...styles.textStyle2}}>View All</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator= {false}  horizontal>
                <DescriptionCard source={require('../assets/sliders/images/doctor.png')}
                name= "Dr. Jonathan D. Smith"
                title= "Obstetricians/Gynecologists"
                thumbimg = {styles.thumbimg}
                />
                <DescriptionCard source={require('../assets/sliders/images/doctor2.png')}
                name= "Dr. Jonathan D. Smith"
                title= "Obstetricians/Gynecologists"
                thumbimg = {styles.thumbimg}
                />
                <DescriptionCard source={require('../assets/sliders/images/doctor.png')}
                name= "Dr. Jonathan D. Smith"
                title= "Obstetricians/Gynecologists"
                thumbimg = {styles.thumbimg}
                />
            </ScrollView>
        </View>
        <View style= {styles.lowerContainer}>
            <View style= {styles.pageDesc}>
                <Text style= {{...styles.bolderText, ...styles.textColor}}>Find doctors by specialities</Text>
                <Text style= {{...styles.bolderText, ...styles.textStyle2}}>View All</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator= {false}  horizontal>
                <DescriptionCard source={require('../assets/sliders/images/thumb2.png')}
                name= "Dermatologists"
                thumbimg = {styles.thumbimg}
                />
                <DescriptionCard source={require('../assets/sliders/images/thumb4.png')}
                name= "Obstetricians/Gynecologists"
                thumbimg = {styles.thumbimg}
                />
                <DescriptionCard source={require('../assets/sliders/images/thumb3.png')}
                name= "Surgeons"
                thumbimg = {styles.thumbimg}
                />
            </ScrollView>
        </View>
        <View style= {styles.imageStyleContainer}>
            <TouchableOpacity>
            <Image 
                style= {styles.imageDim}
                source= {require('../assets/sliders/images/plan_card.png')} />
            </TouchableOpacity>

        </View>
        <View style= {styles.lowerContainer}>
            <View style= {styles.pageDesc}>
                <Text style= {{...styles.bolderText, ...styles.textColor}}>Chat with Top Doctors</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator= {false}  horizontal>
                <DescriptionCard source={require('../assets/sliders/images/thumbs6.png')}
                name= "Having issues with you skin?"
                title= "Dermatologists"
                consult= "Consult Now"
                thumbimg = {styles.biggerThumb}
                />
                <DescriptionCard source={require('../assets/sliders/images/thumbs7.png')}
                name= "Not sure of your hormone system?"
                title= "Dermatologists"
                consult= "Consult Now"
                thumbimg = {styles.biggerThumb}
                />
                <DescriptionCard source={require('../assets/sliders/images/thumbs8.png')}
                name= "Not sure of your hormone system?"
                title= "Dermatologists"
                consult= "Consult Now"
                thumbimg = {styles.biggerThumb}
                />
            </ScrollView>
        </View>
        

            
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7FA',
    },
    biggerThumb: {
        width: '100%',
        height: 80
    },
    imageStyleContainer: {
        marginVertical: 10
    },
    thumbimg: {
        width: 80,
        height: 80,
        marginTop: 20,
        resizeMode: 'contain'
    },
    bolderText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    imageDim: {
        width: '100%',
        height: 240
    },
    textContainer: {
        width: '60%'
    },
    pageDesc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    firstCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 15
    },
    secondCont: {
        paddingHorizontal: 30
    },
    lowerContainer: {
        paddingHorizontal: 30,
        marginVertical: 10
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
    imageStyle: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    imageStyle2: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    imageStyle3: {
        width: 150,
        height: 100,
        resizeMode: 'contain'
    },
    colorText: {
        color: '#6C0BA9'
    },
    boldText: {
        fontSize: 18,
        marginBottom: 3,
        fontWeight: 'bold',
        color: '#464646'
    },
    textStyle1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F1F1F',

    },
    textStyle2: {
        color: '#6C0BA9',
        marginVertical: 3
    },
    textStyle3: {
        color: '#9B9B9B'
    },
    textStyle4: {
        color: '#9B9B9B',
        marginVertical: 2
    }
})
export default HomeScreen