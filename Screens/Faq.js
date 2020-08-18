import React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions, Image } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
const Faq = () => {
    return (
        <ScrollView style= {styles.container}>
            <View>
            <Collapse style= {styles.collapse}>
                <CollapseHeader>
                <View style= {styles.flexCont}>
                    <Text style= {styles.textStyle}>How do I login to my account</Text>
                    <Image style= {{width: 30, height: 30, resizeMode: 'contain'}} source= {require('../assets/sliders/images/arrow_down.png')} />
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </CollapseBody>
            </Collapse>
            <Collapse style= {styles.collapse}>
                <CollapseHeader>
                <View style= {styles.flexCont}>
                    <Text style= {styles.textStyle}>Why do I have to input my vitals</Text>
                    <Image style= {{width: 30, height: 30, resizeMode: 'contain'}} source= {require('../assets/sliders/images/arrow_down.png')} />
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </CollapseBody>
            </Collapse>
            <Collapse style= {styles.collapse}>
                <CollapseHeader>
                <View style= {styles.flexCont}>
                    <Text style= {styles.textStyle}>Why do I have to input my vitals</Text>
                    <Image style= {{width: 30, height: 30, resizeMode: 'contain'}} source= {require('../assets/sliders/images/arrow_down.png')} />
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </CollapseBody>
            </Collapse>
            <Collapse style= {styles.collapse}>
                <CollapseHeader>
                <View style= {styles.flexCont}>
                    <Text style= {styles.textStyle}>I can remember my password</Text>
                    <Image style= {{width: 30, height: 30, resizeMode: 'contain'}} source= {require('../assets/sliders/images/arrow_down.png')} />
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </CollapseBody>
            </Collapse>
            <Collapse style= {styles.collapse}>
                <CollapseHeader>
                <View style= {styles.flexCont}>
                    <Text style= {styles.textStyle}>Why do I have to input my vitals</Text>
                    <Image style= {{width: 30, height: 30, resizeMode: 'contain'}} source= {require('../assets/sliders/images/arrow_down.png')} />
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </CollapseBody>
            </Collapse>
            </View>
            <View style= {styles.textContainer}>
                <Text style= {styles.textStyle2}>For more enquires, Please call any of the following numbers:</Text>
                <Text>070 000 000 000</Text>
                <Text>070 000 000 000</Text>
                <Text>070 000 000 000</Text>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 25,
        minHeight: 300
    },
    textContainer: {
       marginVertical: 15
    },
    flexCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textStyle2: {
        fontSize: 16,
        marginVertical: 5
    },
    collapse: {
        backgroundColor: '#F7F7FA',
        marginVertical: 5,
        paddingVertical: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        minHeight: 40
    }
});

export default Faq