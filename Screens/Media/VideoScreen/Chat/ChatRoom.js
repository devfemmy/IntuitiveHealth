import React, { Component } from 'react';
import { View,AsyncStorage, Button, TextInput, StyleSheet,TouchableOpacity, FlatList,Alert, Text } from 'react-native';
import { OTSession } from 'opentok-react-native';
import CountDown from 'react-native-countdown-component';
import axios from '../../../../axios-req';
import EndCallIcon from '../../../../assets/sliders/images/end_call.svg';
import SendIcon from '../../../../assets/sliders/images/send.svg';
import { StackActions } from '@react-navigation/native';
import InnerBtn from '../../../../Components/InnerBtn';


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
    };
    this.sessionEventHandlers = {
      signal: (event) => {
        if (event.data) {
          const myConnectionId = this.session.getSessionInfo().connection.connectionId;
          const oldMessages = this.state.messages;
          const messages = event.connectionId === myConnectionId ? [...oldMessages, {data: `Me: ${event.data}`}] : 
          [...oldMessages, {data: `Doctor: ${event.data}`}];
          this.setState({
            messages,
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
  cancelMyAppointment = (history_id) => {
    const id = AsyncStorage.getItem('Mytoken').then(
      res => {
        const data = {
          history_id: parseInt(history_id)
        }
          axios.post('user/checkout/history',data, {headers: {Authorization: res}})
          .then(
              res => {
             
                console.log(res)
              
                  
                 
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


checkoutSession = (history_id) => {
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
                this.cancelMyAppointment(history_id)
            

        },
      },
    ]
  );
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
        <Text style={styles.item}>{item.data}</Text>
        </View>
      )
    }else {
      return (
        <View style= {styles.textContainer2}>
        <Text style={styles.item}>{item.data}</Text>
        </View>
      )
    }

  
  };
  render() {
    const {key, sessionId, token, time_left, history_id} = this.props.route.params;
    return (
      <View style={{ flex: 1, padding: 25, paddingTop: 5}}>
        <View style= {{marginVertical: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        <CountDown
          until={time_left}
          size={30}
          onFinish={() => this.sendUsReview(history_id)}
          digitStyle={{backgroundColor: '#FFF', height: 35}}
          digitTxtStyle={{color: '#51087E', fontSize: 20}}
          timeToShow={['M', 'S']}
          timeLabels={{m: 'min', s: 'sec'}}
        />
          <TouchableOpacity style= {{marginRight: 10}} onPress= {() => this.checkoutSession(history_id)}>
                <EndCallIcon width= {40} height= {40} />
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
    marginVertical: 3,
    borderColor: '#cdcdcd',
    minHeight: 30
  },
  textContainer2: {
    backgroundColor: '#f5e5ff',
    borderWidth: 1,
    marginVertical: 3,
    // borderColor: '',
    minHeight: 30
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