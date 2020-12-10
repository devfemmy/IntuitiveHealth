import React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import Icon from '../../assets/sliders/images/secondopinion.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';
import UploadIcon3 from '../../assets/sliders/images/sco1.svg';
import UploadIcon4 from '../../assets/sliders/images/sco2.svg';

const SecondOpinion = (props) => {
    return (
        <ScrollView styles= {{flex: 1, backgroundColor: '#F7F7FA'}}>
        <View style= {styles.container}>
            <TouchableOpacity style= {styles.videoContainer}>
                <Icon width= {300} height= {250} />
                {/* <MyAppText  style= {styles.textStyle}>Second Opinion</MyAppText> */}
                {/* <MyAppText style= {styles.textStyle2}>Let us get your second opinion</MyAppText> */}
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Title') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon3 width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                            Start second opinion process
                            </MyAppText>
                            {/* <MyAppText style= {styles.colorText}>Continue */}
                                {/* <Keyback width= {15} height= {15} /> */}
                            {/* </MyAppText> */}
                        </View>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => props.navigation.navigate('ViewSo') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon4 width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                            View My Second Opinions
                            </MyAppText>
                            {/* <MyAppText style= {styles.colorText}>Continue */}
                                {/* <Keyback width= {15} height= {15} /> */}
                            {/* </MyAppText> */}
                        </View>
                    </View>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        height: Dimensions.get('window').height,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    videoContainer: {
        marginVertical: 40,
        alignItems: 'center'
    },
    textStyle: {
        color: '#1F1F1F',
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 18
    },
    textStyle2: {
        color: '#9B9B9B',
        marginHorizontal: 70,
        textAlign: 'center'
    },
    textCont: {
        width: '50%'
    },
    btnContainer: {
        // backgroundColor: 'white',
        width: '100%',
        backgroundColor: '#F7F7FA',
        paddingHorizontal: 25
        // alignItems: 'center'
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

export default SecondOpinion