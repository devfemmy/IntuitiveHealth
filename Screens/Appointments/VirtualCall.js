import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';

export default class VirtualCall extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '46930374';
    this.sessionId = '2_MX40NjkzMDM3NH5-MTYwMDk5OTI1MzUzNX5tTlI0cm9vWm5odTV2R1h0OTFJY01Tc05-fg';
    this.token = 'T1==cGFydG5lcl9pZD00NjkzMDM3NCZzaWc9NmI3NzFiMDlhNGQ3ZWFjYTVjNmM3YWU3NWU1NTg5YzBiZGU1NThkZDpzZXNzaW9uX2lkPTJfTVg0ME5qa3pNRE0zTkg1LU1UWXdNRGs1T1RJMU16VXpOWDV0VGxJMGNtOXZXbTVvZFRWMlIxaDBPVEZKWTAxVGMwNS1mZyZjcmVhdGVfdGltZT0xNjAwOTk5MzE1Jm5vbmNlPTAuMjA1MjQ5MDE1OTYwNzEwMSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjAxMDAyOTE1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  }
  render() {
    // const {key, sessionId, token} = this.props.route.params
    // console.log(key)
    // console.log(sessionId)
    // console.log(token)
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <OTSession apiKey={this.apiKey} sessionId={this.sessionId} token={this.token}>
          <OTPublisher style={{ width: 100, height: 100 }} />
          <OTSubscriber style={{ width: 100, height: 100 }} />
        </OTSession>
      </View>
    );
  }
}