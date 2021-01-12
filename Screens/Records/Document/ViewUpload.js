import React, {useState, useEffect} from 'react';
import { View, StyleSheet,PermissionsAndroid,Alert, ScrollView,AsyncStorage,ActivityIndicator, TouchableOpacity } from 'react-native';
import Keyback from '../../../assets/sliders/images/keyback.svg';
import MyAppText from '../../../Components/MyAppText';
import ResumeIcon from '../../../assets/sliders/images/resume.svg';
import UploadIcon from '../../../assets/sliders/images/upload.svg';
import MedIcon from '../../../assets/sliders/images/medycon.svg';
import ProfileCard from '../../../Components/ProfileCard';
import axios from '../../../axios-req';
import RNFetchBlob from 'rn-fetch-blob';
import ImageIcon from '../../../assets/sliders/images/imageicon.svg';
import PDFIcon from '../../../assets/sliders/images/pdficon.svg';
import errorHandler from '../../ErrorHandler/errorHandler'

const ViewUploads = (props) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    const [myToken, setToken] = useState(null)

    const token = AsyncStorage.getItem('Mytoken').then(
        res => {
            setToken(res)
        }
      ).catch(err => console.log(err));
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {

                axios.get('document/list', {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false)
                        const documents = res.data.data;
                        console.log('documents', documents)
                        setDocuments(documents);
                        // console.log("appointments", res.data)
                        // const profile = res.data.data;
                        // const lastname = profile.last_name;
                        // const firstname = profile.name;
                        // const email = profile.email;
                        // const occupation = profile.occupation;
                        // const location = profile.location;
                        // setFirstname(firstname);
                        // setLastname(lastname);
                        // setEmail(email);
                        // setOccupation(occupation)
                        // setLocation(location)
                       
                    }
                )
                .catch(err => {
                    setError(true)
                    setLoading(false)
                    const code = err.response.status;
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [
                              {text: 'OK', onPress: () => signOut()},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                        // showLoaded(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => null},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                    
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
        
    
      }, []);

     const actualDownload = (path, name) => {
         setLoading(true)
         const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: `${name}.pdf`,
          path: `${dirs.DownloadDir}/${name}.pdf`,
          },
        })
          .fetch('GET', `https://conduit.detechnovate.net/public/api/user/${path}`, {
            Authorization : myToken,
            Accept: 'application/pdf',
          })
          .then((res) => {
            setLoading(false)
            Alert.alert('Your File has been saved')
            console.log('The file saved to ', res.path());
          })
          .catch((e) => {
            setLoading(false)
            Alert.alert('Error saving file')
            console.log(e)
          });
      }
      
      const  downloadFile = async (path, name) => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              actualDownload(path, name);
            } else {
              Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
          } catch (err) {
            console.warn(err);
          } 
      }
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }

    return (
        <ScrollView style= {styles.container}>
            <View style= {styles.firstContainer}>
                    <MedIcon width= {280} height= {280} />
                    <MyAppText style= {styles.textStyle2}>
                    Your recent uploads here
                    </MyAppText>
            </View>
                <View>
                {documents.map((doc, index) => {
                    const docType_id = parseInt(doc.type_id);
                    if (docType_id === 1) {
                        return (
                            <TouchableOpacity onPress= {() => props.navigation.navigate('ViewList', {path: doc.path, name: doc.name})}>
                            <ProfileCard key= {index}>
                            <View>
                            <MyAppText style= {styles.fileName}>
                            {doc.name}
                            </MyAppText>
                            {/* <MyAppText style= {styles.documentTxt}>
                                {doc.path}
                            </MyAppText> */}
                            </View>
                            <ImageIcon width= {30} height= {30} />
                            </ProfileCard>
                            </TouchableOpacity>

                        )
                    }else {
                        return (
                            <TouchableOpacity onPress= {()=> downloadFile(doc.path, doc.name)}>
                            <ProfileCard key= {index}>
                            <View>
                            <MyAppText style= {styles.fileName}>
                               {doc.name}
                            </MyAppText>
                            {/* <MyAppText style= {styles.documentTxt}>
                                {doc.path}
                            </MyAppText> */}
                            </View>
                            <PDFIcon width= {30} height= {30} />
                            </ProfileCard>
                            </TouchableOpacity>

                        )
                    }
                })}
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

export default errorHandler(ViewUploads, axios)