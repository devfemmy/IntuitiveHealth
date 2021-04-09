import React, { Component } from 'react';
import { View,AsyncStorage, Button, TextInput, StyleSheet,TouchableOpacity, FlatList,Alert, Text } from 'react-native';
import { OTSession } from 'opentok-react-native';
import CountDown from 'react-native-countdown-component';
import axios from '../../../../axios-req';
import EndCallIcon from '../../../../assets/sliders/images/end_call.svg';
import SwitchChat from '../../../../assets/sliders/images/switch_camera.svg';
import SendIcon from '../../../../assets/sliders/images/send.svg';
import { StackActions } from '@react-navigation/native';
import MyAppText from '../../../../Components/MyAppText';
import { Overlay } from 'react-native-elements';
import ChatOverlay from '../../../../Components/ChatOverlay';


export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    // this.apiKey = key;
    // this.sessionId = sessionId;
    // this.token = token
    this.state = {
      signal: {
        data: '',
        type: '',
      },
      text: '',
      messages: [],
      visible: false,
      moveScreen: false
    };
    this.sessionEventHandlers = {
      signal: (event) => {
        console.log("event data", event.data)
        if (event.data  && event.type != 'video') {
          const myConnectionId = this.session.getSessionInfo().connection.connectionId;
          const oldMessages = this.state.messages;
          const messages = event.connectionId === myConnectionId ? [...oldMessages, {data: `Me: ${event.data}`}] : 
          [...oldMessages, {data: `Doctor: ${event.data}`}];
          this.setState({
            messages,
          });
        } else if (event.type === 'video' && event.data === "2") {
        //  this.setState({visible: false, moveScreen: true});
         this.setState({
          signal: {
            type: 'video',
            data: '3',
          },
          text: '',
          visible: false,
          moveScreen: true
        });
         
        }
      },
    };
  }
  sendSignal() {
    if (this.state.text) {
      this.setState({
        signal: {
          type: '',
          data: this.state.text,
        },
        text: '',
      });
    }
  }
  sendLeaveSignal = () => {
    this.setState({
      signal: {
        type: 'Leave',
        data: 'Left chat',
      },
      text: '',
    });
  }
  sendVideoSignal = () => {
    this.setState({
      signal: {
        type: 'video',
        data: '1',
      },
      text: '',
      visible: true
    });
  }
  cancelMyAppointment = (history_id, channel_id) => {
    const id = AsyncStorage.getItem('Mytoken').then(
      res => {
        const data = {
          history_id: parseInt(history_id),
          channel_id: channel_id
        }
          axios.post('user/checkout/history',data, {headers: {Authorization: res}})
          .then(
              res => {
                 
              }
          ) 
          .catch(err => {
           setError(true)
          });
  
      }
  )
  .catch( err => {console.log(err)});
  this.props.navigation.dispatch(
    StackActions.replace('Review', {
      history_id: parseInt(history_id),
    })
  );
  // props.navigation.navigate('Review', {history_id: parseInt(history_id)})
  }


checkoutSession = (history_id, channel_id) => {
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
                this.sendLeaveSignal();
                this.cancelMyAppointment(history_id, channel_id);
            

        },
      },
    ]
  );
}
getToken = (request_id) => {
  // setLoading(true)
      const id = AsyncStorage.getItem('Mytoken').then(
          res => {

              axios.get(`user/history/token/${request_id}`, {headers: {Authorization: res}})
              .then(
                  res => {
                      // setLoading(false)
                      console.log(res.data.data, "token")
                      // clearInterval(timerId)
                      const key = res.data.data.api_key;
                      const session = res.data.data.session_id;
                      const token = res.data.data.token;
                      const time_left = res.data.data.time_left;
                      this.props.navigation.dispatch(
                        StackActions.replace('Test Chat', {key: key, sessionId: session, token: token, 
                          time_left: time_left, history_id: 1, channel_id: 2}
                          )
                      );
                      // this.props.navigation.dispatch(
                      //   StackActions.replace('Home')
                      // );
                  }
              )
              .catch(err => {
                  // setLoading(false)
                  const code = err.response.status;
                  const message = err.response.data.message;
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
                    
                  }
  
                    
                  
  
              })
          }
      )
      .catch( err => {console.log(err)}) 
  

}
moveToVideoScreen = (key, sessionId, token, time_left, history_id, channel_id) => {

}
switchToChat = (key, sessionId, token, time_left, history_id, channel_id) => {
  Alert.alert(
    'Switch Chat?',
    'Are you sure you want to switch chat?',
    [
      { text: "Don't switch", style: 'cancel', onPress: () => {} },
      {
        text: 'Switch',
        style: 'destructive',
        // If the user confirmed, then we dispatch the action we blocked earlier
        // This will continue the action that had triggered the removal of the screen
        onPress: () => {
                // props.navigation.dispatch(e.data.action)
                // this.sendLeaveSignal();
                this.sendVideoSignal()
                // this.getToken(history_id)
                // Send Signal with type video and data will be 1.
                // 2. 
                // this.moveToVideoScreen(key, sessionId, token, time_left, history_id, channel_id)
                // this.cancelMyAppointment(history_id);
            

        },
      },
    ]
  );
}
 cancelBackdrop = () => {
   this.setState({visible: false})
 }
  sendUsReview = (history_id) => {
    const history = parseInt(history_id);
   
    // cancelMyAppointment()

    Alert.alert(
      'Alert',
      'Your Session has ended',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Review', {history_id: history})},
      ],
      { cancelable: false }
    )
  }
  _keyExtractor = (item, index) => index;
  _renderItem = ({item}) => {
    const chatMe = item.data.slice(0, 2);
    if (chatMe === 'Me') {
      return (
        <View style= {styles.textContainer}>
        <MyAppText style={styles.item}>{item.data}</MyAppText>
        </View>
      )
    }else {
      return (
        <View style= {styles.textContainer2}>
        <MyAppText style={styles.item}>{item.data}</MyAppText>
        </View>
      )
    }

  
  };
  render() {
    const {key, sessionId, token, time_left, history_id, channel_id} = this.props.route.params;
    if (this.state.moveScreen) {
      this.props.navigation.dispatch(
        StackActions.replace('Test Chat', {key: key, sessionId: sessionId, token: token, 
          time_left: time_left, history_id: history_id, channel_id: channel_id}
          )
      );
    }
    return (
      <View style={{ flex: 1, padding: 25, paddingTop: 5}}>
        <View style= {{marginVertical: 10, paddingBottom: 5,  flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#cdcdcd', borderBottomWidth: 1}}>
        <CountDown
          until={time_left}
          size={30}
          onFinish={() => this.sendUsReview(history_id)}
          digitStyle={{backgroundColor: '#FFF', height: 35}}
          digitTxtStyle={{color: '#51087E', fontSize: 20}}
          timeToShow={['M', 'S']}
          timeLabels={{m: 'min', s: 'sec'}}
        />

            <TouchableOpacity style= {{marginRight: 10, alignItems: 'center'}} onPress= {() => this.switchToChat(key, sessionId, token, time_left, history_id, channel_id)}>
                  <SwitchChat width= {40} height= {40} />
                  <MyAppText>Switch</MyAppText>
            </TouchableOpacity>
        
          <TouchableOpacity style= {{marginRight: 10, alignItems: 'center'}} onPress= {() => this.checkoutSession(history_id, channel_id)}>
                <EndCallIcon width= {40} height= {40} />
                <MyAppText>End Chat</MyAppText>
          </TouchableOpacity>
      </View>
        {/* <Text style={styles.mainText}> OpenTok React Native Signaling Sample</Text> */}
        <OTSession 
          apiKey={key}
          sessionId={sessionId}
          token={token}
          signal={this.state.signal}
          eventHandlers={this.sessionEventHandlers}
          ref={(instance) => {
            this.session = instance;
          }}
        />
        <FlatList
          data={this.state.messages}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
        <View style= {styles.flexContainer}>
          <View style={{width: '80%'}}>
            <TextInput
            // textAlignVertical= "top"
            textAlignVertical= {"top"}
            multiline = {true}
            numberOfLines= {5}
            style={styles.styleInput}
            onChangeText={(text) => { this.setState({ text }); }}
            value={this.state.text}
          />
          </View>
          <TouchableOpacity style= {{marginRight: 10}} onPress={() => { this.sendSignal(); }}>
                <SendIcon width= {40} height= {40} />
          </TouchableOpacity>
        </View>
        <Overlay isVisible={this.state.visible} onBackdropPress={() => this.cancelBackdrop()}>
                <ChatOverlay onPress= {() => this.cancelBackdrop()} message= {"Switching to Video"} />
        </Overlay>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 15,
    height: 44,
    color: 'black'
  },
  mainText: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  textContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#cdcdcd',
    minHeight: 30,
    width: '80%'
    
  },
  textContainer2: {
    backgroundColor: '#f5e5ff',
    // borderWidth: 1,
    marginVertical: 10,
    // borderColor: '',
    minHeight: 30,
    width: '80%',
    marginLeft: '20%'
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  styleInput: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#cdcdcd',
    padding: 10
  }
})