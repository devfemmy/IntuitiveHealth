import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView,Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import MyAppText from '../../../../Components/MyAppText';
import Icon from '../../../../assets/sliders/images/mentalhealth.svg';
import SlotIconText from '../../../../Components/SlotIconText';
import AdultIcon from '../../../../assets/sliders/images/adult.svg';
import ChildIcon from '../../../../assets/sliders/images/child.svg';
import Arrow from '../../../../assets/sliders/images/arrow2.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from '../../../../axios-req';
const MentalHealth = (props) => {
    const [showBtn, setShowBtn] = useState(true);
    const [groups, setGroup] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get('mental/group', {headers: {Authorization: res}})
                .then(
                    res => {
                      setLoading(false)
                        // console.log("mental health", res.data.data)
                        const group = res.data.data;
                        setGroup(group);
                       
                    }
                )
                .catch(err => {
                  console.log(err)
                  setLoading(false)
                    const code = err.response.status;
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [
                              {text: 'OK', onPress: () => signOut()},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                      setLoading(false)
                      console.log(err)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => setShowBtn(true)},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                      console.log(err.response.status)
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
        
    
      }, []);
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
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
            {groups.map((group, index) => {
                const groupid= parseInt(group.id)
                if (groupid === 1) {
                    return (
                        <TouchableOpacity key= {index}  onPress= {() => props.navigation.navigate('IntakeForm', {id: groupid})}>
                        <View style= {styles.lowerContainer}>
                            <View>
                                <SlotIconText size={20} icon= {<AdultIcon width= {28} height= {28} />} text= {group.group_name} />
                            </View>
                            <Arrow width= {30} height= {30} />
                        </View>
                    </TouchableOpacity>
                    )
                } else if (groupid === 2) {
                    return (
                        <TouchableOpacity  key= {index} onPress= {() => props.navigation.navigate('IntakeForm', {id: groupid})}>
                        <View style= {styles.lowerContainer}>
                            <View>
                                <SlotIconText size={20} icon= {<AdultIcon width= {28} height= {28} />} text= {group.group_name} />
                            </View>
                            <Arrow width= {30} height= {30} />
                        </View>
                    </TouchableOpacity>
                    )
                } else if (groupid === 4 ) {
                    return (
                        <TouchableOpacity  key= {index}  onPress= {() => props.navigation.navigate('IntakeForm', {id: groupid})}>
                        <View style= {styles.lowerContainer}>
                            <View>
                                <SlotIconText size={20} icon= {<ChildIcon width= {28} height= {28} />} text= {group.group_name} />
                            </View>
                            <Arrow width= {30} height= {30} />
                        </View>
                    </TouchableOpacity>
                    )
                } else if (groupid === 3) {
                    return (
                        <TouchableOpacity  key= {index}  onPress= {() => props.navigation.navigate('IntakeForm', {id: groupid})}>
                        <View style= {styles.lowerContainer}>
                            <View>
                                <SlotIconText size={20} icon= {<ChildIcon width= {28} height= {28} />} text= {group.group_name.slice(0,25)} />
                            </View>
                            <Arrow width= {30} height= {30} />
                        </View>
                    </TouchableOpacity>
                    )
                } 
                
                else {
                    <TouchableOpacity  onPress= {() => props.navigation.navigate('IntakeForm', {id: groupid})}>
                    <View style= {styles.lowerContainer}>
                        <View>
                            <SlotIconText size={20} icon= {<ChildIcon width= {28} height= {28} />} text= "Adolescent" />
                        </View>
                        <Arrow width= {30} height= {30} />
                    </View>
                </TouchableOpacity>
                }
            })}

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