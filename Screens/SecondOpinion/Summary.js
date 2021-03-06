import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView,Alert,AsyncStorage, ActivityIndicator } from 'react-native';
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';
import ProfileInput from '../../Components/ProfileInput';
import MultiSelect from 'react-native-multiple-select';
import axios from '../../axios-req';
import errorHandler from '../ErrorHandler/errorHandler';


const Summary = (props) => {

    const {title, comment,summary_id, selectedItems} = props.route.params;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // fetchDocuments();
            console.log('selected Item', selectedItems)
          });
  
        
        return unsubscribe;
      }, [props.navigation]);
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }

      const sendSecondOpinion = () => {
          if (title === '' || comment === '') {
              alert('Fields cannot be empty')
          }else {
            setLoading(true)
            const id = AsyncStorage.getItem('Mytoken').then(
                res => {
                    const data = selectedItems
                    axios.post('user/second/save', {response:data, title: title, comments: comment}, {headers: {Authorization: res}})
                    .then(
                        res => {
                            setLoading(false) 
                            const message = res.data.message;
                            Alert.alert(
                                'Success!',
                                message,
                                [
                                  {text: 'OK',  onPress: () => props.navigation.popToTop()},
                                ],
                                { cancelable: false }
                              )
    
                        }
                    )
                    .catch(err => {
                        setLoading(false);
                        setError(true)                        
        
                    })
                }
            )
            .catch( err => {console.log(err)}) 
          }

      }
    return (
        <View style= {styles.container}>
            <ScrollView>
                <View style= {styles.lowerContainer}>
                    <ProfileInput editable= {false}  value= {title}  label= "Title" />
                    <ProfileInput editable= {false}  value= {comment} label= "Comment" lines= {5} multiline= {true} />
                </View>
                {summary_id === 1 ? 
            <View style= {{marginHorizontal: 20}}>
                <MyAppText style= {{...styles.label}}>Selected Documents: </MyAppText>
                {selectedItems.map(
                    (item, index) => {
                        return (
                            <MyAppText style= {styles.textStyle} key= {index}>
                                {item}
                            </MyAppText>
                        )
                    }
                )}
            </View>   : null 
            }
                {/* <View style= {{marginHorizontal: 20}}>
                    <MultiSelect
                    // hideTags
                    items={documents}
                    uniqueKey="id"
                    // ref={(component) => { multiSelect = component }}
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Select Documents"
                    searchInputPlaceholderText="Search Documents..."
                    onChangeInput={ (text)=> console.log(text)}
                    // altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#51087E"
                    tagBorderColor="#51087E"
                    tagTextColor="#51087E"
                    selectedItemTextColor="#51087E"
                    selectedItemIconColor="#51087E"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Submit"
        />
                </View> */}

        {/* <View>
          {multiSelect.getSelectedItemsExt(selectedItems)}
        </View> */}
            </ScrollView>
            <View style= {styles.footer}>
            <InnerBtn onPress= {sendSecondOpinion} width= "100%" text= "Finish" color= "white" bg= "#51087E" />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
    },
    lowerContainer: {
        padding: 25
    },
    footer: {
        minHeight: 100,
        backgroundColor: 'white',
        paddingHorizontal: 25
    },
    label: {
        color: '#BBC2CC',
        marginTop: 35,
        marginBottom: 5
    },
    textStyle: {
        color: '#51087E',
        textAlign: 'left'
    }
});

export default errorHandler(Summary, axios)