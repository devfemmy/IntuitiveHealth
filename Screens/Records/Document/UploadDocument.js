import React, { useState } from 'react';
import { View, StyleSheet, ScrollView,Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import DocumentIcon from '../../../assets/sliders/images/document.svg';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob'
import MyAppText from '../../../Components/MyAppText';
import InnerBtn from '../../../Components/InnerBtn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from '../../../axios-req';
import ImagePicker from 'react-native-image-picker';
import { Image } from 'react-native';

const UploadDocument = (props) => {
    const [filename, setFileName] = useState(null);
    const [pdfUri, setPdfUri] = useState(null)
    const [fileType, setFileType] = useState(null)
    const [imageUri, setImageUri] = useState(null);
    const [myToken, setToken] = useState(null);
    const [blob, setBlob] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [imageData, setImageData] = useState('');


    const token = AsyncStorage.getItem('Mytoken').then(
        res => {
            setToken(res)
        }
      ).catch(err => console.log(err));

      // Use image picker
      const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

    const ImagePickerHandler = () => {
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
          const data = response.uri;
          const imageData = response.data;
          setImageData(imageData)
          setContent(data)
          console.log("data", data)
        }
      });
    }
    const documentUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
              // readContent: true
            });
            // setPdfUri(results)
            // setImageUri(results)
            console.log('uri', res.uri);
            // console.log('content', res.content);
            setContent(res.content)
            
            if (res.type === DocumentPicker.types.pdf) {
                console.log("PDF PICKER Res",res)
                // var fileReader = new FileReader();
                // console.log("Binaruwudfd",fileReader.readAsDataURL(res.uri))
                // console.log("Conentetnet",fileReader.readContent(res.uri))
                setPdfUri(res.uri)
                // const blob = RNFetchBlob.wrap(res.uri)
                // setBlob(blob)
            }
            else {
              setImageUri(res.uri);
              // const content = res.content
              // setContent(content);
              // console.log("content", content)
              const results = await RNFetchBlob.fs.readFile(res.uri, 'base64');
              console.log('base643', results)
              setBlob(results);

            
            }
            setFileName(res.name)
            setFileType(res.type)
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
    const rfbSending = () => {
        setLoading(true)
        RNFetchBlob.fetch('POST', 'https://conduit.detechnovate.net/public/api/user/image/upload', {
            Authorization : myToken,
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
          }, [
          { name : 'upload_file', filename : fileType, type:'image/foo', 
          data: RNFetchBlob.wrap(imageUri)
        
        },
        { name : 'name', 
        data: filename
      
      },
          ]).then(res => res.json()).
          then((resp) => {
            // ...
            setLoading(false)
            const message = resp.message;
            Alert.alert(
              'Alert!',
              message,
              [
                {text: 'OK', onPress: () => props.navigation.popToTop()},
              ],
              { cancelable: false }
            )
            console.log('What is', resp)
          }).catch((err) => {
            // ...
            setLoading(false)
            alert('failed')
            console.log('I pray o', err)
          })
    }

    const pdfSending = () => {
      setLoading(true)
      RNFetchBlob.fetch('POST', 'https://conduit.detechnovate.net/public/api/user/doc/upload', {
          Authorization : myToken,
          otherHeader : "foo",
          'Content-Type' : 'multipart/form-data',
        }, [
        { name : 'upload_file', filename : fileType, type:'pdf/foo', 
        data: RNFetchBlob.wrap(pdfUri)
      
      },
      { name : 'name', 
      data: filename
    
    },
        ]).then(res => res.json()).
        then((resp) => {
          setLoading(false)
          console.log('What is', resp)
          const message = resp.message;
          Alert.alert(
            'Alert!',
            message,
            [
              {text: 'OK', onPress: () => props.navigation.popToTop()},
            ],
            { cancelable: false }
          )
        }).catch((err) => {
          // ...
          setLoading(false)
          alert('failed')
          console.log('I pray o', err)
        })
  }

  const sendDocument = () => {
    if (pdfUri === null && imageUri === null) {
      alert('No Document selected')
    } else {
      if (imageUri === null) {
        pdfSending()
      } else {
        rfbSending()
      }
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
            <View style= {styles.upperContainer}>
                <TouchableOpacity onPress= {documentUpload}>
                    <DocumentIcon width= {280} height= {200} />
                        <MyAppText style= {styles.textStyle}>Select Document to upload here</MyAppText>
                </TouchableOpacity>

                    <View>
                        <MyAppText style= {{color: '#51087E'}}>
                            {filename}
                        </MyAppText>
                        {/* <Image
                        source = {{uri: content}} 
                        style={{width: 250, height: 250, resizeMode: 'cover'}} /> */}
                    </View>
            </View>
            <View style= {styles.btnContainer}>
                <InnerBtn onPress= {sendDocument} bg= "#51087E" color= "white" text= "Upload Document" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
    },
    upperContainer: {
        margin: 25,
        alignItems: 'center'
    },
    btnContainer: {
        margin: 20,
        marginVertical: 40
    },
    textStyle: {
        color: '#9B9B9B',
        marginVertical: 50
    }
});

export default UploadDocument