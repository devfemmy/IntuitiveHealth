import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import { OTSession } from 'opentok-react-native';

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '47140794';
    this.sessionId = '1_MX40NzE0MDc5NH5-MTYxNDI1OTkyMzI0NX5hK1JISUJ4T3FucEJoVDdoR25veXRZUW5-fg';
    this.token = 'T1==cGFydG5lcl9pZD00NzE0MDc5NCZzaWc9OWM1MzUyMDYzMjdhMWMzYzYyM2ZmZjFjYWE1YjRmYWNjMjBlMDRhMjpzZXNzaW9uX2lkPTFfTVg0ME56RTBNRGM1Tkg1LU1UWXhOREkxT1RreU16STBOWDVoSzFKSVNVSjRUM0Z1Y0VKb1ZEZG9SMjV2ZVhSWlVXNS1mZyZjcmVhdGVfdGltZT0xNjE0MjU5OTU3Jm5vbmNlPTAuNDEwNDM5NzQxMzY1Njc0MiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjE0MjYzNTU2JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
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
          [...oldMessages, {data: `Other: ${event.data}`}];
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
  _keyExtractor = (item, index) => index;
  _renderItem = ({item}) => (
    <Text style={styles.item}>{item.data}</Text>
  );
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.mainText}> OpenTok React Native Signaling Sample</Text>
        <OTSession 
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          token={this.token}
          signal={this.state.signal}
          eventHandlers={this.sessionEventHandlers}
          ref={(instance) => {
            this.session = instance;
          }}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => { this.setState({ text }); }}
          value={this.state.text}
        />
        <Button
          onPress={() => { this.sendSignal(); }}
          title="Send Signal"
        />
        <FlatList
          data={this.state.messages}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  mainText: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  }
})