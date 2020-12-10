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
		const { PROP,pressed,question_id,option } = this.props;
        const { value } = this.state;
        // console.log('value', this.state)

		return (
			<View>
				{PROP.map((res, index) => {
					const alphabet = index + 1
					return (
						<View key={res.id} style={styles.container}>
							<TouchableOpacity
								
								style={
									value === res.id && styles.selectedRb
								}
								onPress= {
									() => {
										this.props.pressed({question_id, value: res.id}),
										this.pressedFunction(res.id)
										// this.functionPressed(this.props)
									}
								}
								> 
							<MyAppText style={
								value === res.id && styles.radioText || styles.radioText2
							}>{`${(alphabet + 9 ).toString(36).toLowerCase()}. ${res.name}`}</MyAppText>
							{/* {value === res.id && <Text style={styles.selectedRb} />} */}
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
        marginBottom: 15,
        // marginTop: 15,
        // alignItems: 'center',
		// flexDirection: 'row',
		backgroundColor: 'white',
		height: 38,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: '#EDEFF2',
		color: '#9B9B9B',
		justifyContent: 'center',
	},
    radioText: {
        marginRight: 35,
        fontSize: 18,
        color: 'white',
		fontWeight: '700',
		width: '100%',
		paddingHorizontal: 15,
		// backgroundColor: 'yellow'
	},
	radioText2: {
		color: '#9B9B9B',
		paddingHorizontal: 15,

	},
	// radioCircle: {
	// 	height: 50,
	// 	width: '100%',
	// 	borderRadius: 100,
	// 	borderWidth: 2,
	// 	borderColor: '#51087E',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// },
	selectedRb: {
		width: '100%',
		height: 38,
		// borderRadius: 50,
		justifyContent: 'center',
		backgroundColor: '#6C0BA9',
		// paddingHorizontal: 15,
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});