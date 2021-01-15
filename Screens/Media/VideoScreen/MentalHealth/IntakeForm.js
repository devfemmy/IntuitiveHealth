import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView,Alert,AsyncStorage, ActivityIndicator } from 'react-native';
import ProfileInput from '../../../../Components/ProfileInput';
import InnerBtn from '../../../../Components/InnerBtn';
import axios from '../../../../axios-req';
import MyAppText from '../../../../Components/MyAppText';
import RadioButton from '../../../../Components/RadioButtons';

const IntakeForm = (props) => {
    const  {id} = props.route.params;
    const [showBtn, setShowBtn] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noQuestion, setNoQues] = useState(null);
    const [sortedAnswers, setSortedAnswers] = useState(false);
    const [inputState, setInput] = useState(null)
    console.log('group id', id)
    useEffect(() => {
        const token = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get(`mental/questions/${id}`, {headers: {Authorization: res}})
                .then(
                    res => {
                      setLoading(false)
                        console.log("lifestyle", res.data.data)
                        const questions = res.data.data;
                        const length = questions.length;
                        if (length < 1) {
                          setNoQues('No Question for selected group')
                        }
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
        if (noQuestion != null || sortedAnswers === false) {
          alert('You cannot submit Incomplete form')
        } else {
          setShowBtn(false)
  
          const token = AsyncStorage.getItem('Mytoken').then(
            
              res => {
                   const sortedData = questions.map((question)=>{
                     console.log("QUESTION", question)
                     return {question_id:question.id,answer:question.answer}
                   }
                 );
                  const data = sortedData;
                  const group_id = parseInt(id);
                  axios.post('mental/response', {response:data, group_id}, {headers: {Authorization: res}})
                  .then(
                      res => {  
                         // console.log(res)
                          const message = res.data.message; 
                          // console.log('response', res)
                          const form_id = res.data.data.form_id;
                          // console.log('formid222', form_id);
                          const stringId = form_id.toString()
                          AsyncStorage.setItem('formid', stringId);
                          Alert.alert(
                            'Alert',
                            message,
                            [
                              {text: 'OK', onPress: () => props.navigation.navigate('Practise', {name: 'Mental Health', id: 2})},
                            ],
                            { cancelable: false }
                          )
                          setShowBtn(true)
                      }
                  )
                  .catch(err => {
                    // console.log("error", err.response)
                     setShowBtn(true)
                     console.log(err.response)
                     const message = err.response.data.message
                      const code = err.response.status;
                      // const message = err.response.message;
                     if (code === 400) {
                       Alert.alert(
                        'Error',
                        message,
                        [
                          {text: 'OK', onPress: () => props.navigation.goBack()},
                        ],
                        { cancelable: false }
                      )

                     }
                      else if (code === 401) {
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

      }
      const onRadioValueChanged = ({question_id,value})=>{
        // console.log('what is', question_id)
        const newQuestions = questions.map((question)=>{
            if(question.id===question_id)
            {
                return {...question,answer:value, question_id: question_id}
            }
           
            return question;
        });
        setQuestions(newQuestions);
        // console.log('myql', newQuestions)
        setSortedAnswers(true)
        // sortArray()
    };
    const saveInputChange = (value, id) => {
      // console.log('inputsValue', value)
      const newQuestions = questions.map((question)=>{
        if(question.id===id)
        {
          // console.log('points', question)
          
            return {...question,answer:value, question_id: id}
        }
       
        return question;
    });
   setQuestions(newQuestions)
  //  console.log('new q', newQuestions)
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
          <MyAppText style= {{textAlign: 'center'}}>{noQuestion}</MyAppText>
        {questions.map(
                      (question, index) =>  {
                        const response_type_id = parseInt(question.response_type_id);
                        let options = question.options;
                        const PROP = options;
                        if (response_type_id === 2) {
                          // console.log('question_id', question.id)
                            return (
                              <View key = {index}>
                              <MyAppText style= {styles.headerText}>
                                {question.question}
                              </MyAppText>
                              <RadioButton 
                              question_id={question.id} 
                              pressed= {onRadioValueChanged} 
                              PROP={PROP} />
                              <View>
                              </View>
                                </View>
                            )
                        } 
                        else {
                          // console.log('options', question)
                            return (
                                <View>
                                <ProfileInput
                                // value= {question.options}
                                onChangeText = {(value) => saveInputChange(value, question.id)}
                                label= {question.question}
                                
                                />
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
            {showBtn ?   <InnerBtn onPress= {sortArray} text= "Save" color= "#fff" bg= "#51087E" /> : <ActivityIndicator size= "large" color= "#000075"/>}
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
        marginVertical: 20
    },
    headerText: {
        marginVertical: 10
    }
});

export default IntakeForm