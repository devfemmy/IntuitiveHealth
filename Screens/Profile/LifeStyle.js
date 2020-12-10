import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Alert, ScrollView, AsyncStorage,ActivityIndicator } from 'react-native';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';
import axios from '../../axios-req';
import RadioButton from '../../Components/RadioButtons';


const LifeStyle = (props) => {
    const [showBtn, setShowBtn] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleSwitch = (index) => {
      alert(index)
      setIsEnabled(previousState => !previousState);
    } 
    
    
    useEffect(() => {
      const id = AsyncStorage.getItem('Mytoken').then(
          res => {
             console.log('synch', res)
              axios.get('lifestyle/questions', {headers: {Authorization: res}})
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
    if (loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <ActivityIndicator  size="large" color="#51087E" />
        </View>
      );
    }
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
          if(question.question.id===question_id)
          {
              return {...question,option_id:value, question_id: question_id}
          }
         
          return question;
      });
      console.log('myql', newQuestions)
      setQuestions(newQuestions);
      // sortArray()
  };
    return (
        <ScrollView style= {styles.container}>
      <View style={[styles.scene, { backgroundColor: '#F7F7FA', padding: 20 }]}>
        <View style= {styles.profileCont}>          
                    {questions.map(
                      (question, index) =>  {
                        let options = question.options;
                        const PROP = options;
                        return (
                          <View key = {index}>
                          <MyAppText style= {styles.headerText}>
                            {question.question.question}
                          </MyAppText>
                          <RadioButton 
                          question_id={question.question.id} 
                          pressed= {onRadioValueChanged} PROP={PROP} />
                          <View>
                              {/* {question.options.map(
                                (ans, index) => {
                                  return (
                                    <View key= {index}>
                                    <CheckBox
                                      title={ans.name}
                                      checkedIcon='dot-circle-o'
                                      uncheckedIcon='circle-o'
                                      checked={checked}
                                      onPress={()=> onPressCheckbox(ans.name)}
                                    />
                                    </View>
                                  )
                                }
                              )} */}
                          </View>
                            </View>
                        )
                      }
                    )}                        
          
          {/* <View>
                      <PickerInput 
                      placeholder= "How active is your lifestyle?"
                      items= {[
                        { label: 'Active', value: 'active' },
                        { label: 'Inactive', value: 'inactive' },
                    ]} />
            </View>
            <View style= {styles.lastcontainer}>
                      <PickerInput 
                      placeholder= "Main Diet?"
                      items= {[
                        { label: 'Vegetarian', value: 'vege' },
                       
                    ]} />
            </View> */}
               {showBtn ?   <InnerBtn onPress= {sortArray} text= "Save" color= "#fff" bg= "#51087E" /> : <ActivityIndicator size= "large" color= "#000075"/>}
           
        </View>
    </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 20
    },
    inputContainer: {
      marginBottom: 50
    },
    textStyle: {
        color: '#9B9B9B'
    },
    textStyle2: {
        color: '#464646',
        fontWeight: 'bold'
    },
    labelStyle: {
      fontFamily: 'HammersmithOne-Regular' 
    },
    headerText: {
      fontSize: 20,
      marginBottom: 10
    },
    switchContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 40,
      marginBottom: 15
  },
    profileCont: {
      paddingVertical: 20
    },
    lastcontainer: {
      marginVertical: 15
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    pickerContainer: {
      width: '45%',
      marginVertical: 8
    },
    bmiText: {
      color: '#51087E',
      fontSize: 28,
      marginBottom: 25,
      textAlign: 'left'
    },
    options: {
      backgroundColor: 'red',
      marginVertical: 5
    },
    resultContainer: {
      marginVertical: 40
    },
    bmiStyle: {
      fontSize: 22
    },
    bmiStyle2: {
      fontSize: 34,
      color: '#6C0BA9'
    },
    touchbtn: {
      backgroundColor: '#D30C0C0B',
      borderWidth: 1,
      borderColor: '#E6C300',
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      height: 35
    },
    btnTextStyle: {
      color: '#E6C300'
    }
});

export default LifeStyle;
