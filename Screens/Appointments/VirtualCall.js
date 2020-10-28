import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Alert } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import CountDown from 'react-native-countdown-component';

export default class VirtualCall extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '46930374';
    this.sessionId = '1_MX40NjkzMDM3NH5-MTYwMTM3MDU2MjAzM343TFl5TWNvZVpuZHE0eUZEVTNON0E2OGl-fg';
    this.token = 'T1==cGFydG5lcl9pZD00NjkzMDM3NCZzaWc9NWQyOTY5MjEyZTdmM2EzYmRiMTgyNGRiNjNhZmVlOGQ1MDJmZjhlNjpzZXNzaW9uX2lkPTFfTVg0ME5qa3pNRE0zTkg1LU1UWXdNVE0zTURVMk1qQXpNMzQzVEZsNVRXTnZaVnB1WkhFMGVVWkVWVE5PTjBFMk9HbC1mZyZjcmVhdGVfdGltZT0xNjAxMzcwNTg4Jm5vbmNlPTAuNDA2NjU4OTcyNTI1Mjc5NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjAxMzc0MTg4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  }
  sendUsReview = (history_id) => {
    const history = parseInt(history_id)
    Alert.alert(
      'Alert',
      'Your Session has ended',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Review', {history_id: history})},
      ],
      { cancelable: false }
    )
  }

  render() {
    const {key, sessionId, token, time_left, history_id} = this.props.route.params
    // console.log(key)
    // console.log(sessionId)
    // console.log(token)
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
          onFinish={() => this.sendUsReview(history_id)}
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
})