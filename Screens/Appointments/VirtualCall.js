import React, { Component, useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet,AsyncStorage, Alert, TouchableOpacity } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import CountDown from 'react-native-countdown-component';
import axios from 'axios';
import EndCallIcon from '../../assets/sliders/images/end_call.svg';

const VirtualCall = (props) =>  {
  const {key, sessionId, token, time_left, history_id} = props.route.params;
  // const [unique_id, setHistoryId] = useState('');

  const cancelMyAppointment = () => {
    const id = AsyncStorage.getItem('Mytoken').then(
      res => {
        const data = {
          history_id: parseInt(history_id)
        }
          axios.post('https://conduit.detechnovate.net/public/api/user/checkout/history',data, {headers: {Authorization: res}})
          .then(
              res => {
             
                console.log(res)
              
                  
                 
              }
          )
          .catch(err => {
            console.log(err.response)
          });
  
      }
  )
  .catch( err => {console.log(err)});
  props.navigation.navigate('Review', {history_id: parseInt(history_id)})
  }


const checkoutSession = () => {
  Alert.alert(
    'Exit Page?',
    'Are you sure you want to leave Room?',
    [
      { text: "Don't leave", style: 'cancel', onPress: () => {} },
      {
        text: 'Leave',
        style: 'destructive',
        // If the user confirmed, then we dispatch the action we blocked earlier
        // This will continue the action that had triggered the removal of the screen
        onPress: () => {
                // props.navigation.dispatch(e.data.action)
                cancelMyAppointment()
            

        },
      },
    ]
  );
}
 const sendUsReview = (history_id) => {
    const history = parseInt(history_id);
   
    cancelMyAppointment()

    Alert.alert(
      'Alert',
      'Your Session has ended',
      [
        {text: 'OK', onPress: () => props.navigation.navigate('Review', {history_id: history})},
      ],
      { cancelable: false }
    )
  }

 
  
    return (
      <View style={{ flex: 1}}>
        {/* <OTSession apiKey={key} sessionId={sessionId} token={token}>
          <OTPublisher style={{ width: 100, height: 100 }} />
          <OTSubscriber style={{ width: 100, height: 100 }} />
        </OTSession> */}
      <View style= {{marginVertical: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        <CountDown
          until={time_left}
          size={30}
          onFinish={() => sendUsReview(history_id)}
          digitStyle={{backgroundColor: '#FFF', height: 35}}
          digitTxtStyle={{color: '#51087E', fontSize: 20}}
          timeToShow={['M', 'S']}
          timeLabels={{m: 'min', s: 'sec'}}
        />
          <TouchableOpacity style= {{marginRight: 10}} onPress= {checkoutSession}>
                <EndCallIcon width= {40} height= {40} />
          </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
      <OTSession apiKey={key} sessionId={sessionId} token={token}>
          <View style= {styles.container}>
        
          <OTPublisher style={styles.publisher} />
          <OTSubscriber style={styles.subscriber} />
        
          </View>
        </OTSession>
      </View>

      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  publisher: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
    bottom: 10,
    left: 10,
    zIndex: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white'
  },
  subscriber: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
    zIndex: 10,

  }
});

export default VirtualCall