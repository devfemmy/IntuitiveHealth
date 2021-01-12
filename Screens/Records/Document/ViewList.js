import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView,AsyncStorage,ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import Keyback from '../../../assets/sliders/images/keyback.svg';
import MyAppText from '../../../Components/MyAppText';
import ResumeIcon from '../../../assets/sliders/images/resume.svg';
import UploadIcon from '../../../assets/sliders/images/upload.svg';
import MedIcon from '../../../assets/sliders/images/medycon.svg';
import ProfileCard from '../../../Components/ProfileCard';
import axios from '../../../axios-req';
import RNFetchBlob from 'rn-fetch-blob';
import errorHandler from '../../ErrorHandler/errorHandler';

const ViewList = (props) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uri, setUri] = useState(null);
    const {path} = props.route.params;
    const [error, setError] = useState(false)
    let base64Icon = `data:image/png;base64,${uri}`;

    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                RNFetchBlob.fetch('GET', `https://conduit.detechnovate.net/public/api/user/${path}`, {
                    Authorization : res,
                    Accept: 'application/pdf',
                    
                    // more headers  ..
                  })
                  .then((res) => {
                    console.log('success', res)
                    let status = res.info().status;
                    console.log('status', status)
                    setLoading(false)
                    if(status === 200) {
                    
                    let uri = res.data
                    setUri(uri)
                      // the conversion is done in native code
                      let base64Str = res.base64()
                      console.log('basestring', base64Str)
                      // the following conversions are done in js, it's SYNC
                      let text = res.text()
                      let json = res.json()
                      console.log('myjson', json)
                    } else {
                      // handle other status codes
                    }
                  })
                  // Something went wrong:
                  .catch((errorMessage, statusCode) => {
                    // error handling
                    console.log('success', res)
                    setError(true)
                    
                  })
            }
        )
        .catch( err => {console.log(err)}) 
        
    
      }, []);
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }

    return (
        <ScrollView style= {styles.container}>
                <View>
                    <Image style= {styles.imageStyle3} source= {{uri: base64Icon}} />
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        padding: 25
    },
    textCont: {
        width: '50%'
    },
    fileName: {
        color: 'black',
        fontSize: 18
    },
    firstContainer: {
        alignItems: 'center'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 20,
        marginHorizontal: 10,
        fontSize: 30
    },
    imageStyle3: {
        width: 350,
        height: 250,
        resizeMode: 'contain'
    },
    documentTxt: {
        color: '#6C0BA9'
    },
    textStyle2: {
        color: '#9B9B9B',
        textAlign: 'center',
        marginBottom: 25
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    imageStyle: {
        width: 100,
        height: 110
    },
    colorText: {
        color: '#6C0BA9'
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
});

export default errorHandler (ViewList, axios);