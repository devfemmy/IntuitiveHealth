import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator,Alert, AsyncStorage } from 'react-native';
import InnerBtn from '../../Components/InnerBtn';
import MyAppText from '../../Components/MyAppText';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ProfileInput from '../../Components/ProfileInput';
import axios from '../../axios-req';
import errorHandler from '../ErrorHandler/errorHandler';

const Ratings = (props) => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRatings] = useState(0);
    const [showBtn, setShowBtn] = useState(true);
    const {history_id} = props.route.params;
    const [error, setError] = useState(false)

    const  ratingCompleted = (rating) => {
        setRatings(rating)
      }
      const submitReview = () => {
        if (rating === 0) {
            alert('Please fill in your rating')
        } else {
            setShowBtn(false)
            const id = AsyncStorage.getItem('Mytoken').then(
                res => {
                    const data = {
                        // title:  title,
                        // email: email,
                        review: review,
                        // name: name,
                        rating: rating,
                        history_id: history_id
                    }
                    axios.post('user/feedback/create', data, {headers: {Authorization: res}})
                    .then(
                        res => {  
                           console.log(res)
                            const message = res.data.message; 
                            Alert.alert(
                             'Alert!',
                             message,
                             [
                               {text: 'OK', onPress: () => props.navigation.popToTop()},
                             ],
                             { cancelable: false }
                           )
                            setShowBtn(true)
                        }
                    )
                    .catch(err => {
                        setShowBtn(true)
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
                <MyAppText style= {styles.textStyle}>
                    Share Your Feedback
                </MyAppText>
                <View>
                    <AirbnbRating
                    reviewColor= "black"
                    onFinishRating= {ratingCompleted}
                    count={5}
                    reviews={[ "Bad", "Okay", "Good", "Very Good", "Wow"]}
                    defaultRating={0}
                    size={35}
                    />
                </View>
                <View style= {styles.feedBackForm}>
                    {/* <ProfileInput value= {title} onChangeText= {setTitle}  label= "Title of your review" /> */}
                    <ProfileInput value= {review} multiline = {true} lines= {5} onChangeText= {setReview}  label= "Your Review" />
                    {/* <ProfileInput value= {name} onChangeText= {setName}  label= "Name" /> */}
                    {/* <ProfileInput value= {email} onChangeText= {setEmail}  label= "Email Address" /> */}
                </View>
                <MyAppText onPress= {() => props.navigation.navigate('Home')} style= {styles.textStyle2}>Skip Feedback</MyAppText>
            </ScrollView>
            <View style= {styles.footer}>
            {showBtn ?   <InnerBtn onPress= {submitReview} text= "Submit" color= "white" border= "#51087E" bg= "#51087E" /> : <ActivityIndicator size= "large" color= "#000075"/>}
               
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 25
    },
    textStyle: {
        color: '#51087E',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10
    },
    textStyle2: {
        textAlign: 'center',
        marginVertical: 25
    },
    feedBackForm: {
        marginVertical: 25
    },
    footer: {
        height: 100,
        backgroundColor: 'white'
    }
});

export default errorHandler(Ratings, axios);