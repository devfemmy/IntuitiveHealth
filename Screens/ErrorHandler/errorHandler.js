import React, {Component} from 'react';
import { View, Alert } from 'react-native';
import MyAppText from '../../Components/MyAppText';
// import Modal from '../../components/UI/Modal/Modal';
// import Supx from '../Supx'


const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res => res, (error) => {
                console.log("this is the errors", error.response )
               this.setState({error: error});
               const errorData = error.response.data;
               const status = error.response.status;
               const errorCode = errorData.error_code;
               const userType = parseInt(errorData.user_type);
               const msg = errorData.message;
               if (status === 403 && errorCode === 102) {
                    if (userType === 1) {
                            Alert.alert(
                                "Error",
                                msg,
                                [
                                  {text: 'OK', onPress: () => this.props.navigation.navigate('Selfpay')},
                                ],
                                { cancelable: false }
                              )
                    }else {
                        Alert.alert(
                            "Error",
                            msg,
                            [
                              {text: 'OK', onPress: () => this.props.navigation.navigate('ExpiredSub')},
                            ],
                            { cancelable: false }
                          )
                    }
               }else if (status === 403 && errorCode === 101) {
                Alert.alert(
                    "Error",
                    msg,
                    [
                      {text: 'OK', onPress: () =>   this.props.navigation.navigate('GetToken')},
                    ],
                    { cancelable: false }
                  )
              
               }
 
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);

        }
        removeErrorHandler = () => {
            this.setState({error: null})
        }
        render() {
            return (
                <>
                {/* <View show = {this.state.error}
                modalClosed = {this.removeErrorHandler}> */}
                {/* <View> */}
                {this.state.error ?

                ( null
                // <View>
                // <MyAppText>
                //     {this.state.error ? this.state.error.message : null}
                // </MyAppText>
                // </View>

                    
                ) : null
                }

                   
                {/* </View> */}
                <WrappedComponent {...this.props}/>
                </>
                 
            )
        }
       
    } 
}

export default errorHandler;