import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView,Alert,AsyncStorage, ActivityIndicator } from 'react-native';
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';
import ProfileInput from '../../Components/ProfileInput';
import MultiSelect from 'react-native-multiple-select';
import axios from '../../axios-req';
import errorHandler from '../ErrorHandler/errorHandler';

const FilterDocuments = (props) => {

    const {title, comment} = props.route.params;
    const [selectedItems, setSelectedItems] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    

    const fetchDocuments = () => {
        setLoading(true)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('user/document/list/unassigned', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        const documents = res.data.data;
                        setDocuments(documents);                      
                    }
                )
                .catch(err => {
                    setLoading(false);
                    setError(true);
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchDocuments()
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

     
      const onSelectedItemsChange = selectedItems => {
        setSelectedItems(selectedItems);
        console.log('selected Items', selectedItems)
      };
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
                            console.log('documents', res) 
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
      moveToNextPage = () => {
          props.navigation.navigate('Summary', {
              title: title,
              comment: comment,
              selectedItems: selectedItems,
              summary_id: 1
          })
      }
    return (
        <View style= {styles.container}>
            <ScrollView>
                {/* <View style= {styles.lowerContainer}>
                    <ProfileInput editable= {false}  value= {title}  label= "Title" />
                    <ProfileInput editable= {false}  value= {comment} label= "Comment" line= {4} multiline= {true} />
                </View> */}
                <View style= {{marginHorizontal: 20, marginVertical: 5}}>
                    <MyAppText 
                    onPress= {() => props.navigation.navigate('Upload', {upload_id: true})}
                    style= {{marginVertical: 20, padding: 10,
                        borderBottomColor: '#1F1F1F1F', borderBottomWidth: 1}}>Click here to add new document</MyAppText>
                    <MultiSelect
                    // hideTags
                    items={documents}
                    uniqueKey="name"
                    // ref={(component) => { multiSelect = component }}
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Assign Documents"
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

                </View>

        {/* <View>
          {multiSelect.getSelectedItemsExt(selectedItems)}
        </View> */}
            </ScrollView>
            <View style= {styles.footer}>
            <InnerBtn onPress= {moveToNextPage} width= "100%" text= "Next" color= "white" bg= "#51087E" />
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
    }
});

export default errorHandler(FilterDocuments, axios)