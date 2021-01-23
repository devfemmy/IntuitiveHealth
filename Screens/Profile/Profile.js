import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InnerBtn from '../../Components/InnerBtn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyAppText from '../../Components/MyAppText';
import UploadIcon from '../../assets/sliders/images/profile1.svg';
import UploadIcon2 from '../../assets/sliders/images/profile2.svg';
import UploadIcon3 from '../../assets/sliders/images/profile3.svg';


const Profilepage = (props) => {
    console.log('Value Component', props.value)
    return (
        <ScrollView style= {styles.container}>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Personal') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon3 width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Personal
                            </MyAppText>
                            {/* <MyAppText style= {styles.colorText}>Continue */}
                                {/* <Keyback width= {15} height= {15} /> */}
                            {/* </MyAppText> */}
                        </View>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Bmi') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Body Mass Index
                            </MyAppText>
                            {/* <MyAppText style= {styles.colorText}>Continue */}
                                {/* <Keyback width= {15} height= {15} /> */}
                            {/* </MyAppText> */}
                        </View>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Lifestyle') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon2 width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                LifeStyle
                            </MyAppText>
                            {/* <MyAppText style= {styles.colorText}>Continue */}
                                {/* <Keyback width= {15} height= {15} /> */}
                            {/* </MyAppText> */}
                        </View>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => props.navigation.navigate('Input') }>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                        <UploadIcon width= {130} height= {130} />
                        </View>
                        <View style= {styles.textCont}>
                            <MyAppText style= {styles.boldText}>
                                Vitals
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

export default Profilepage