import React, { useEffect } from 'react';
import { Text, View } from 'react-native';


const TestChat = (props) => {
    const {key, sessionId, token, time_left, history_id, channel_id} = props.route.params;
    useEffect(() => {
        console.log("waiting", token)
        props.navigation.navigate('Virtual', {key: key, sessionId: sessionId, token: token, 
            time_left: time_left, history_id: history_id, channel_id: channel_id})
      }, [])
    return (
        <View>
            {/* <Text onPress= {() =>

                                })}>Hello Test Char</Text> */}
        </View>
    )
}

export default TestChat;