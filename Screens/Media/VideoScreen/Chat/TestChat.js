import React from 'react';
import { Text, View } from 'react-native';


const TestChat = (props) => {
    const {key, sessionId, token, time_left, history_id, channel_id} = props.route.params;
    return (
        <View>
            <Text onPress= {() =>props.navigation.navigate('Virtual', {key: key, sessionId: sessionId, token: token, 
                                time_left: time_left, history_id: history_id, channel_id: channel_id})}>Hello Test Char</Text>
        </View>
    )
}

export default TestChat;