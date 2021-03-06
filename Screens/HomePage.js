import React, {useEffect} from 'react';
import { View, StyleSheet,AsyncStorage,Alert, Text, Image, Dimensions } from 'react-native';
import { Overlay } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import DescriptionCard from '../Components/DescpCard';
import Logo from '../assets/sliders/images/home.svg';
import Logo1 from '../assets/sliders/images/home1.svg';
import MyAppText from '../Components/MyAppText';
import Arrow from '../assets/sliders/images/arrow2.svg';
import axios from '../axios-req';
import Carousel from 'react-native-snap-carousel';
import HomeOverlay from '../Components/HomeOverlay';
import { Container, Header, Content, Button, Toast } from "native-base";
// import errorHandler from './ErrorHandler/errorHandler';
// import errorHandler from './ErrorHandler/errorHandler';
// import Card from '../assets/sliders/images/placard.svg'

const HomeScreen = (props) => {
    const [firstname, setFirstName] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [doctors, setDoctors] = React.useState([]);
    const [image, setImage] = React.useState('');
    const [hmo_user_field, setHmoUser] = React.useState('');
    const [mentalSliders, setMentalSliders] = React.useState([]);
    const [Sliders, setSliders] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [welcome, setWelcome] = React.useState('Welcome Back');
    const [loaded, setLoaded] = React.useState(false);
    // const [error, setError] = React.useState(false);
    let showWelcome = null;
    const toggleOverlay = () => {
        setVisible(true);
      };
      const removeModal = () => {
        setVisible(false);
      } 

    const name = AsyncStorage.getItem('firstname').then(
        res => {
           setFirstName(res)
        }
      ).catch(err => console.log(err));
      const hmo_user = AsyncStorage.getItem('hmo_user').then(
        res => {
          setHmoUser(res);
        }
      ).catch(err => console.log(err));
      const welcomeMsg = AsyncStorage.getItem('login').then(
        res => {
          const mssg = parseInt(res);
          if (mssg === 1) {
            setWelcome("Welcome Back")
          }else {
            setWelcome("Welcome")
          }
        }
      ).catch(err => console.log(err));
      const last_name = AsyncStorage.getItem('lastname').then(
        res => {
           setLastName(res)
        }
      ).catch(err => console.log(err));
    //   console.log('Doctors', doctors)
      useEffect(() => {
        toggleOverlay()
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
               console.log('home', res);
               axios.get('conduithealth/sliders', {headers: {Authorization: res}})
               .then(
                res => {
                    console.log("home1", res.data)
                    const sliders = res.data.data;
                    setSliders(sliders)
               
                   
                }
            )
            .catch(err => {
                props.navigation.navigate('Error Page')
            });
            axios.get('conduithealth/mental/sliders', {headers: {Authorization: res}})
            .then(
             res => {
                 console.log("home2", res.data)
                 const mental_sliders = res.data.data;
                 setMentalSliders(mental_sliders);
                 setLoaded(true)
                 
           
                
             }
         )
         .catch(err => {
            props.navigation.navigate('Error Page')

         });
         axios.get('conduithealth/ad/image', {headers: {Authorization: res}})
         .then(
          res => {
            //   console.log("home3", res.data)
              const image = res.data.data.image;
              setImage(image)
             
          }
      )
      .catch(err => {
        props.navigation.navigate('Error Page')

      });

                axios.get('conduithealth/doctors/1', {headers: {Authorization: res}})
                .then(
                    res => {
                        console.log("home", res.data)
                        const doctors = res.data.data;
                        setDoctors(doctors);
                       
                    }
                )
                .catch(err => {
                    props.navigation.navigate('Error Page')
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
        
    
      }, []);
      const fullname = `${firstname.slice(0, 1).toUpperCase()}${lastname.slice(0, 1).toUpperCase()}`;
     const _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                <TouchableOpacity>
                    <Image  
                    defaultSource= {require('../assets/sliders/images/placeholder2.png')} 
                    style= {styles.imageStyle6} source= {{uri: item.image}} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style= {styles.container}>
        {/* <View style= {{marginHorizontal: 20}}> */}
        <Content padder>
            {Toast.show({
                text: `Welcome ${firstname}`,
                position: 'top',
                textStyle: {textAlign: 'center', fontWeight: 'bold'},
                duration: 3000,
                style: {marginHorizontal: 25, borderRadius: 10}
            
              })}
        </Content>
        {/* </View> */}
        <TouchableOpacity onPress= {()=> props.navigation.navigate('Profile')}>
        <View style= {styles.firstCont}>
                    <View style= {styles.circle}>
                        <Text style= {styles.circleText}>
                            {fullname}
                        </Text>
                    </View>
                <View>
                    <MyAppText style= {styles.textStyle1}>
                        {firstname.toUpperCase()}
                    </MyAppText>
                    <MyAppText style= {styles.textStyle2}>View and edit profile</MyAppText>
                    <MyAppText style= {styles.textStyle3}>100% complete</MyAppText>
                </View>
                <Arrow width= {35} height= {35} />
           </View>
        </TouchableOpacity>
        <View>
            <Carousel
                // ref={(c) => { _carousel = c; }}
                data={Sliders}
                renderItem={_renderItem}
                sliderWidth={400}
                itemWidth={350}
                autoplay= {true}
                lockScrollWhileSnapping= {true}
                loop= {true}
                />
        </View>
        <View style= {styles.secondCont}>
            <TouchableOpacity onPress= {()=> props.navigation.navigate('Find A Doctor')}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                            <Logo width= {100} height= {120} />
                        </View>
                        <View style= {styles.textContainer}>
                            <MyAppText style= {styles.boldText}>Find a doctor</MyAppText>
                            <MyAppText style= {styles.textStyle4}>Get virtual consultation online with doctors</MyAppText>
                            <MyAppText style= {styles.textStyle2}>Find Doctor</MyAppText>
                        </View>
                    </View>
            </TouchableOpacity>
        </View>
        <View style= {styles.secondCont}>
            <TouchableOpacity  onPress= {()=> props.navigation.navigate('Medical Records')}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                            <Logo1 width= {100} height= {120} />
                        </View>
                        <View style= {styles.textContainer}>
                            <MyAppText style= {styles.boldText}>View Medical Records</MyAppText>
                            <MyAppText style= {styles.textStyle2}>View Now</MyAppText>
                        </View>
                    </View>
            </TouchableOpacity>
        </View>
        <View style= {styles.lowerContainer}>
            <View style= {styles.pageDesc}>
                <MyAppText style= {{...styles.bolderText, ...styles.textColor}}>Doctors You Have Contacted</MyAppText>
                {/* <MyAppText onPress= {()=> props.navigation.navigate('My Doctors')} style= {{...styles.bolderText, ...styles.textStyle2}}>View All</MyAppText> */}
            </View>
            <ScrollView showsHorizontalScrollIndicator= {false}  horizontal>
                {doctors.map(
                    (doctor, index) => {
                        const doctor_id = parseInt(doctor.id);
                        // console.log("i need this", doctor)
                        return (
                            <View key= {index}>
                                <DescriptionCard
                                    // pressed = {
                                    //     (item.slots === null) ? ()=> alert('Doctor Not Available') : ()=> this.props.navigation.navigate('Slot', {doctor_id: item.id, group_id:id })
                                        
                                    // } 
                                onPress = {() => props.navigation.navigate('Slot', {doctor_id: doctor_id, group_id: 1})}
                                source= {{uri: doctor.image}}
                                name= {`${doctor.name} ${doctor.last_name}`}
                                thumbimg = {styles.thumbimg}
                                defaultSource= {require('../assets/sliders/images/placeholder.png')}
                            />
                            </View>
                        )
                    }
                )}
            </ScrollView>
        </View>
        <View style= {styles.imageStyleContainer}>
            {hmo_user_field == "0" ? 
            <TouchableOpacity>
            <Image 
                style= {styles.imageDim222}
                defaultSource= {require('../assets/sliders/images/placeholder2.png')}
                source= {{uri: image}} />
            </TouchableOpacity>: 
            <TouchableOpacity onPress= {() => props.navigation.navigate('ManagePlan')}>
            <Image 
                style= {styles.imageDim222}
                defaultSource= {require('../assets/sliders/images/placeholder2.png')}
                source= {{uri: image}} />
            </TouchableOpacity>
        }

        </View>
        <View style= {styles.lowerContainer}>
            <View style= {styles.pageDesc}>
                <MyAppText style= {{...styles.bolderText, ...styles.textColor}}>Mental Health Specialist</MyAppText>
            </View>
            <ScrollView showsHorizontalScrollIndicator= {false}  horizontal>
                {mentalSliders.map (
                    (slides, index) => {
                        return (
                            <View key= {index}>
                                <DescriptionCard 
                                onPress= {() => props.navigation.navigate('Mental')}
                                source={{uri: slides.image}}
                                name= {slides.name}
                                thumbimg = {styles.biggerThumb}
                                consult= "Consult Now"
                                defaultSource= {require('../assets/sliders/images/placeholder2.png')}
                                />
                            </View>
                        )
                    }
                )}
            </ScrollView>
        </View>
        

            
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7FA',
    },
    biggerThumb: {
        width: '100%',
        height: 80
    },
    imageStyleContainer: {
        marginVertical: 10,
        paddingHorizontal: 15
    },
    thumbimg: {
        width: 80,
        height: 80,
        borderRadius: 80,
        marginTop: 20,
        resizeMode: 'contain'
    },
    bolderText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    imageDim222: {
        width: '100%',
        height: 240,
        borderRadius: 5,
        resizeMode: 'contain'
    },
    textContainer: {
        width: '60%'
    },
    pageDesc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    firstCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 15
    },
    secondCont: {
        paddingHorizontal: 30,
        shadowColor: "#1F1F1F1F",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 5,
    },
    lowerContainer: {
        paddingHorizontal: 30,
        marginVertical: 10
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
    imageStyle: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    imageStyle6: {
        width: 350,
        height: 200,
        resizeMode: 'contain'
    },

    imageStyle2: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    imageStyle3: {
        width: 150,
        height: 100,
        resizeMode: 'contain'
    },
    colorText: {
        color: '#6C0BA9'
    },
    boldText: {
        fontSize: 18,
        marginBottom: 3,
        fontWeight: 'bold',
        color: '#464646'
    },
    textStyle1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F1F1F',

    },
    textStyle2: {
        color: '#6C0BA9',
        marginVertical: 3
    },
    textStyle3: {
        color: '#9B9B9B'
    },
    textStyle4: {
        color: '#9B9B9B',
        marginVertical: 2,
        fontSize: 15
    },
    circleText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    },
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.18,
        height: Dimensions.get('window').width * 0.18,
        backgroundColor:'#6C0BA9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        width: '100%',
        backgroundColor: '#6C0BA9',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 25,
        marginVertical: 15,
        borderRadius: 5
    }

})
export default HomeScreen;