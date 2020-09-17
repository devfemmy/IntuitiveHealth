import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView,Alert,AsyncStorage, ActivityIndicator } from 'react-native';
import ProfileInput from '../../../../Components/ProfileInput';
import InnerBtn from '../../../../Components/InnerBtn';
import axios from '../../../../axios-req';
import MyAppText from '../../../../Components/MyAppText';
import RadioButton from '../../../../Components/RadioButtons';

const IntakeForm = (props) => {
    const [showBtn, setShowBtn] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get('mental/questions/1', {headers: {Authorization: res}})
                .then(
                    res => {
                      setLoading(false)
                        console.log("lifestyle", res.data.data)
                        const questions = res.data.data;
                        setQuestions(questions);
                       
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
      const sortArray = () => {
        setShowBtn(false)
  
       const id = AsyncStorage.getItem('Mytoken').then(
         
           res => {
                const sortedData = questions.map((question)=>{
                  return {question_id:question.question_id,option_id:question.option_id}
                }
              );
               const data = sortedData;
               axios.post('lifestyle/answers', {response:data}, {headers: {Authorization: res}})
               .then(
                   res => {  
                      // console.log(res)
                       const message = res.data.message; 
                       alert(message);
                       setShowBtn(true)
                   }
               )
               .catch(err => {
                  setShowBtn(true)
                  // console.log(err.response)
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
                       setShowBtn(true)
                       Alert.alert(
                           'Network Error',
                           'Please Try Again',
                           [
                             {text: 'OK', onPress: () => setShowBtn(true)},
                           ],
                           { cancelable: false }
                         )
                   }
    
                     
               
    
               })
           }
       )
       .catch( err => {console.log(err)})
      }
      const onRadioValueChanged = ({question_id,value})=>{
  
        const newQuestions = questions.map((question)=>{
            if(question.id===question_id)
            {
                return {...question,option_id:value, question_id: question_id}
            }
           
            return question;
        });
        console.log('myq222', newQuestions)
        setQuestions(newQuestions);
        // sortArray()
    };
    const saveInputChange = (value, id) => {
      const newQuestions = questions.map((question)=>{
        if(question.id===id)
        {
          console.log('points', question)
            return {...question,answer:value, question_id: id}
        }
       
        return question;
    });
   console.log('questions222', newQuestions)
    // setQuestions(newQuestions);
    }
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
    return (
        <ScrollView style= {styles.container}>
        <View>
        {questions.map(
                      (question, index) =>  {
                        const response_type_id = parseInt(question.response_type_id);
                        if (response_type_id === 2) {
                            let options = question.options;
                            const PROP = options;
                            return (
                              <View key = {index}>
                              <MyAppText style= {styles.headerText}>
                                {question.question}
                              </MyAppText>
                              <RadioButton question_id={question.id} pressed= {onRadioValueChanged} PROP={PROP} />
                              <View>
                              </View>
                                </View>
                            )
                        } else {
                            return (
                                <View>
                                <ProfileInput
                                 onChangeText = {(value) => saveInputChange(value, question.id)}
                                label= {question.question} />
                                </View>
                            )
                        }
                      }
                    )}   
            {/* <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View>
            <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View>
            <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View>
            <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View>
            <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
            </View> */}
            <View style= {styles.btnContainer}>
                    <InnerBtn onPress= {() => props.navigation.navigate('Slot')} text= "Continue" color= "white" bg= "#51087E" />
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 20
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnContainer: {
        marginVertical: 50
    },
    headerText: {
        marginVertical: 10
    }
});

export default IntakeForm