import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MyAppText from '../../../../Components/MyAppText';
import Icon from '../../../../assets/sliders/images/mentalhealth.svg';
import SlotIconText from '../../../../Components/SlotIconText';
import AdultIcon from '../../../../assets/sliders/images/adult.svg';
import ChildIcon from '../../../../assets/sliders/images/child.svg';
import Arrow from '../../../../assets/sliders/images/arrow2.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
const MentalHealth = (props) => {
    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.firstContainer}>
                <View style= {styles.imageConatiner}>
                <Icon width= {250} height= {200} />
                </View>
                <MyAppText style= {styles.textStyle}>
                Who Are You Doing The Consultation For?
                </MyAppText>
            </View>
            <TouchableOpacity onPress= {() => props.navigation.navigate('IntakeForm')}>
                <View style= {styles.lowerContainer}>
                    <View>
                        <SlotIconText size={20} icon= {<AdultIcon width= {28} height= {28} />} text= "Adult" />
                    </View>
                    <Arrow width= {30} height= {30} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress= {() => props.navigation.navigate('IntakeForm')}>
                <View style= {styles.lowerContainer}>
                    <View>
                        <SlotIconText size={20} icon= {<AdultIcon width= {28} height= {28} />} text= "Adult Psychiatric" />
                    </View>
                    <Arrow width= {30} height= {30} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress= {() => props.navigation.navigate('IntakeForm')}>
                <View style= {styles.lowerContainer}>
                    <View>
                        <SlotIconText size={20} icon= {<ChildIcon width= {28} height= {28} />} text= "Adolescent" />
                    </View>
                    <Arrow width= {30} height= {30} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress= {() => props.navigation.navigate('IntakeForm')}>
                <View style= {styles.lowerContainer}>
                    <View>
                        <SlotIconText size={20} icon= {<ChildIcon width= {28} height= {28} />} text= "Child" />
                    </View>
                    <Arrow width= {30} height= {30} />
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    firstContainer: {
        backgroundColor: '#51087E',
        minHeight: 350
    },
    lowerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#E8E8E8',
        borderTopWidth: 1,
        padding: 25
    },
    imageConatiner: {
        alignItems: 'center',
        marginTop: 50
    },
    textStyle: {
        fontSize: 30,
        color: 'white',
        marginVertical: 30,
        marginHorizontal: 25
    }
});

export default MentalHealth