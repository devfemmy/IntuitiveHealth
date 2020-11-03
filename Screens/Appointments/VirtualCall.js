import React, { Component, useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet,AsyncStorage, Alert } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import CountDown from 'react-native-countdown-component';
import axios from 'axios';

const VirtualCall = (props) =>  {
  const {key, sessionId, token, time_left, history_id} = props.route.params;
  const [unique_id, setHistoryId] = useState('');

  const cancelMyAppointment = () => {
    const id = AsyncStorage.getItem('Mytoken').then(
      res => {
        const data = {
          history_id: unique_id
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
  props.navigation.navigate('Review', {history_id: unique_id})
  }
  useEffect(() => {
    console.log('history_id', history_id)
    const stringHistory = history_id.toString();
    AsyncStorage.setItem('history', stringHistory);

},
  []);


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
      <View style= {{marginVertical: 10, alignItems: 'flex-end'}}>
        <CountDown
          until={time_left}
          size={30}
          onFinish={() => sendUsReview(history_id)}
          digitStyle={{backgroundColor: '#FFF', height: 35}}
          digitTxtStyle={{color: '#51087E', fontSize: 20}}
          timeToShow={['M', 'S']}
          timeLabels={{m: 'min', s: 'sec'}}
        />
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