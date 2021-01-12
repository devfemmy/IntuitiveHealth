import React, {Component} from 'react';
import { View } from 'react-native';
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
               this.props.navigation.navigate('GetToken')
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

                ( 
                <View>
                <MyAppText>
                    {this.state.error ? this.state.error.message : null}
                </MyAppText>
                </View>

                    
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