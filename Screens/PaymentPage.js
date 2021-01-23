import React, {useState, useEffect} from 'react';
import { StyleSheet,ActivityIndicator,ImageBackground, View,Alert,Button,
    AsyncStorage, TouchableOpacity, Image } from 'react-native';
import MyAppText from '../Components/MyAppText';
import axios from '../axios-req';
import PaystackWebView from "react-native-paystack-webview";
import BasicIcon from '../assets/sliders/images/basic.svg';
import PlatinumIcon from '../assets/sliders/images/platinum.svg';
import SilverIcon from '../assets/sliders/images/silver.svg';
import GoldIcon from '../assets/sliders/images/gold.svg';



const PaymentPage = (props) => {
    const [paymentPlans, setPaymentPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subscription, setSub] = useState('');
    const [expiry_date, setExpiry] = useState('');
    const [color, setColor] = useState('');

    const fetchPaymentPlans = () => {
        setLoading(true)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('subscription', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        // const expiry_data = res.data.data
                        const payment_plans = res.data.data.plan;
                        const subscription = res.data.data.subscription;
                        const expiry_date = new Date(res.data.data.expiry_date.slice(0, 10));
                        const stringedDate = expiry_date.toString().slice(0, 15);
                        const color = res.data.data.color;
                        setSub(subscription);
                        setColor(color); 
                        setExpiry(stringedDate)
                        setPaymentPlans(payment_plans);  
                        console.log('payment_plans', payment_plans)                     
                    }
                )
                .catch(err => {
                    setLoading(false)
                    const code = err.response.status;
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [
                              {text: 'OK', onPress: () => null},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                        // showLoaded(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => setShowBtn(true)},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                    
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchPaymentPlans()
          });     
        return unsubscribe;
      }, [props.navigation]);

      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
    return (
        <View style= {styles.container}>
            {subscription !== 'None' && paymentPlans.length !== 0 ? (
                <MyAppText style= {styles.expiry_date}>
                    {`You are on ${subscription} plan which expires on ${expiry_date}`}
                </MyAppText>
            ): null}
            {paymentPlans.length === 0 ? (<MyAppText style= {{textAlign: 'center'}}>No Subscription present</MyAppText>) : null}
            {paymentPlans.map(
                (plan, index) => {
                    const sub = plan.subscription;
                    console.log('subs', sub)
                    if (sub === 'Basic') {
                        return (
                            <TouchableOpacity onPress= {() => props.navigation.navigate('Buyplan', {plan: plan.subscription})} key= {index}>
                                <View style= {styles.card}>
                                    <View style= {styles.imgCont}>
                                        <BasicIcon width= {120} height= {80} />
                                    </View>
                                    <View style= {styles.textCont}>
                                    <MyAppText style= {styles.boldText}>
                                        {`${plan.subscription} Plan`}
                                    </MyAppText>
                                    <MyAppText style= {styles.boldText}>
                                        {`₦ ${plan.cost}`}
                                    </MyAppText>
                                    <MyAppText style= {{opacity: 0.5}}>
                                        {`${plan.label}`}
                                    </MyAppText>
                                            {/* <MyAppText style= {styles.colorText}>Continue</MyAppText> */}
                                    </View>
                                    </View>
                            </TouchableOpacity>
                            )
                    }else if (sub === 'Gold') {
                        return (
                            <TouchableOpacity onPress= {() => props.navigation.navigate('Buyplan', {plan: plan.subscription})} key= {index}>
                                <View style= {styles.card}>
                                    <View style= {styles.imgCont}>
                                        <GoldIcon width= {120} height= {80} />
                                    </View>
                                    <View style= {styles.textCont}>
                                    <MyAppText style= {styles.boldText}>
                                        {`${plan.subscription} Plan`}
                                    </MyAppText>
                                    <MyAppText style= {styles.boldText}>
                                        {`₦ ${plan.cost}`}
                                    </MyAppText>
                                    <MyAppText style= {{opacity: 0.5}}>
                                        {`${plan.label}`}
                                    </MyAppText>
                                            {/* <MyAppText style= {styles.colorText}>Continue</MyAppText> */}
                                    </View>
                                    </View>
                            </TouchableOpacity>
                            )
                    }else if (sub === 'Platinum') {
                        return (
                            <TouchableOpacity onPress= {() => props.navigation.navigate('Buyplan', {plan: plan.subscription})} key= {index}>
                                <View style= {styles.card}>
                                    <View style= {styles.imgCont}>
                                        <PlatinumIcon width= {120} height= {80} />
                                    </View>
                                    <View style= {styles.textCont}>
                                    <MyAppText style= {styles.boldText}>
                                        {`${plan.subscription} Plan`}
                                    </MyAppText>
                                    <MyAppText style= {styles.boldText}>
                                        {`₦ ${plan.cost}`}
                                    </MyAppText>
                                    <MyAppText style= {{opacity: 0.5}}>
                                        {`${plan.label}`}
                                    </MyAppText>
                                            {/* <MyAppText style= {styles.colorText}>Continue</MyAppText> */}
                                    </View>
                                    </View>
                            </TouchableOpacity>
                            )
                    }else if (sub === 'Silver') {
                        return (
                            <TouchableOpacity onPress= {() => props.navigation.navigate('Buyplan', {plan: plan.subscription})} key= {index}>
                                <View style= {styles.card}>
                                    <View style= {styles.imgCont}>
                                        <SilverIcon width= {120} height= {80} />
                                    </View>
                                    <View style= {styles.textCont}>
                                    <MyAppText style= {styles.boldText}>
                                        {`${plan.subscription} Plan`}
                                    </MyAppText>
                                    <MyAppText style= {styles.boldText}>
                                        {`₦ ${plan.cost}`}
                                    </MyAppText>
                                    <MyAppText style= {{opacity: 0.5}}>
                                        {`${plan.label}`}
                                    </MyAppText>
                                            {/* <MyAppText style= {styles.colorText}>Continue</MyAppText> */}
                                    </View>
                                    </View>
                            </TouchableOpacity>
                            )
                    }

                }
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 25
    },
    textCont: {
        width: '50%'
    },
    imageStyle: {
        width: 100,
        height: 110
    },
    card: {
        backgroundColor: 'white',
        minHeight: 120,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
        marginBottom: 20,
    },
    expiry_date: {
        marginBottom: 25
    }
})

export default PaymentPage