import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MyAppText from './MyAppText';

export default class RadioButton extends Component {
	state = {
		value: null,
	};
	pressedFunction = (id) => {
		this.setState({value: id})
	}
	functionPressed = (props) => {
		// console.log('I was pressed');
		props.pressed()
	}
	render() {
		const { PROP,pressed,question_id } = this.props;
        const { value } = this.state;
        console.log('value', this.state)

		return (
			<View>
				{PROP.map(res => {
					return (
						<View key={res.id} style={styles.container}>
							<MyAppText style={styles.radioText}>{res.name}</MyAppText>
							<TouchableOpacity
								style={styles.radioCircle}
								// onPress={() => {
								// 	this.setState({
								// 		value: res.id,
								// 	});
								// 	this.props.pressed
								// }}
								onPress= {
									() => {
										this.props.pressed({question_id, value: res.id}),
										this.pressedFunction(res.id)
										// this.functionPressed(this.props)
									}
								}
								>
                                  {value === res.id && <View style={styles.selectedRb} />}
							</TouchableOpacity>
						</View>
					);
				})}
                {/* <Text> Selected: {this.state.value} </Text> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        marginBottom: 35,
        // marginTop: 15,
        alignItems: 'center',
        flexDirection: 'row',

		justifyContent: 'space-between',
	},
    radioText: {
        marginRight: 35,
        fontSize: 20,
        color: '#000',
        fontWeight: '700'
    },
	radioCircle: {
		height: 25,
		width: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#51087E',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor: '#51087E',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});