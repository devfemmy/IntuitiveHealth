import React, { useState } from 'react';
import { View, StyleSheet, ScrollView,Alert, AsyncStorage } from 'react-native';
import DocumentIcon from '../../../assets/sliders/images/document.svg';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob'
import MyAppText from '../../../Components/MyAppText';
import InnerBtn from '../../../Components/InnerBtn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from '../../../axios-req';

const UploadDocument = (props) => {
    const [filename, setFileName] = useState(null);
    const [pdfUri, setPdfUri] = useState(null)
    const [fileType, setFileType] = useState(null)
    const [imageUri, setImageUri] = useState(null);
    const [myToken, setToken] = useState(null);
    const [blob, setBlob] = useState('')


    const token = AsyncStorage.getItem('Mytoken').then(
        res => {
            setToken(res)
        }
      ).catch(err => console.log(err));
    const documentUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            // setPdfUri(results)
            // setImageUri(results)
            console.log('uri', res.uri)
            
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
              setImageUri(res.uri)
              const results = await RNFetchBlob.fs.readFile(res.uri, 'base64');
              console.log('base643', results)
              setBlob(results)
            
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
        alert('hey');
               
        RNFetchBlob.fetch('POST', 'https://conduit.detechnovate.net/public/api/user/image/upload', {
            Authorization : myToken,
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
          }, [
            // part file from storage
            { name : 'avatar-foo', filename : filename, type:'image/foo', data: 
            JSON.stringify({
              name : filename,
              upload_file : imageUri
            })
          },
        //     { name : 'test3', upload_file : filename, type: fileType, data: pdfUri
          
        // },
            // elements without property `filename` will be sent as plain text
          ]).then((resp) => {
            // ...
            alert('success')
            console.log('What is', resp)
          }).catch((err) => {
            // ...
            alert('failed')
            console.log('I pray o', err)
          })
    }

    const newUploadImage = async () => {
      let file = {
        data: blob
    };
    let formdata = new FormData();
    formdata.append("name", file);
    // formdata.append("upload_file", file);
   await RNFetchBlob.fetch('POST', 'https://beta.hellonepal.io/api/v1/comments', {
   Authorization : myToken,
   Accept: 'application/json',
  'Content-Type': 'application/octet-stream',
  body: formdata,
 })
 .then((response) => response.json())
 .then((RetrivedData) => {
     console.log(RetrivedData, "data");
 })
 .catch((err) => {
   console.log('Error in adding a comment', err);
 })
          }
    const uploadImage = async () => {
        //Check if any file is selected or not
        if (imageUri != null) {
          //If file selected then create FormData
          const fileToUpload = imageUri;
          console.log('sending', fileToUpload)
          const data = new FormData();
          data.append('name', 'Imageupload');
          data.append('upload_file', fileToUpload)
          console.log(data, "data to be sent")
          fetch(
            'https://conduit.detechnovate.net/public/api/user/doc/upload',
            {
              method: 'post',
              data: data,
              headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': myToken,
              },
            }
          ).then(res => res.json())
          .then((res) => {
            console.log('res', res.data)
            alert("Successful")
         
          }).catch(err => {
            alert("error")
            console.log(err, "error")
          }
          
          )

   

        } else {
          //if no file selected the show alert
          alert('Please Select File first');
        }
    };
    const sendDocument = () => {
        if (filename === null) {
            alert("No Document Selected")
        }else {
            if (imageUri != null) {
                // Send pdf file here

                const id = AsyncStorage.getItem('Mytoken').then(
                    res => {
                        // let url = imageUri;
                         //The url you received from the DocumentPicker
                        // I STRONGLY RECOMMEND ADDING A SMALL SETTIMEOUT before uploading the url you just got.
                        // const split = url.split('/');
                        // const name = split.pop();
                        // const inbox = split.pop();
                        // const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
                        // var data = new FormData();
                        // data.append('pdf', {
                           
                        // })
                        // const data = {
                        //     upload_file: pdfUri,
                        //     name: filename
                        // };
                        var formData = new FormData();
                        // var base64 = require('base-64');
                        // var encodedData = base64.encode(imageUri);
                        formData.append("name",filename);
                        formData.append("upload_file", RNFetchBlob.wrap(blob))
                        // formData.append("upload_file", 'data:image/png;,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')
                        // alert('senttt');
                        console.log('formd', formData)
                        axios.post('image/upload', formData,
                         {headers: {Authorization: res}})
                        .then(
                            res => {  
                                alert("success")
                               console.log(res)
                            }
                        )
                        .catch(err => {
                            // alert(err.response)
                            alert("error")
                            console.log(err.response, "My error")
                        })
                    }
                )
                .catch( err => {console.log(err)})
                // Other block
                    // let url = imageUri; //The url you received from the DocumentPicker
                    // // I STRONGLY RECOMMEND ADDING A SMALL SETTIMEOUT before uploading the url you just got.
                    // const split = url.split('/');
                    // const name = split.pop();
                    // const inbox = split.pop();
                    // const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
                    // console.log('uri path', pdfUri)
                    // console.log('Real path', realPath)
                    
                    // const uploadBegin = (response) => {
                    // const jobId = response.jobId;
                    // console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
                    // };
                    
                    // const uploadProgress = (response) => {
                    // console.log('this block runs')
                    // const percentage = Math.floor(
                    //     (response.totalBytesSent / response.totalBytesExpectedToSend) * 100
                    // );
                    // console.log('UPLOAD IS ' + percentage + '% DONE!');
                    // };
                    
                    // RNFS.uploadFiles({
                    // toUrl:  'https://conduit.detechnovate.net/public/api/user/image/upload',
                    // files: [
                    //     {
                    //         name: filename,
                    //         filename: filename,
                    //         filepath: RNFS.DocumentDirectoryPath + filename,
                    //         filetype: fileType
                    //     },
                    // ],
                    // method: 'POST',
                    // headers: {
                    //     Accept: 'application/json',
                    //     Authorization: myToken
                    // },
                    // begin: uploadBegin,
                    // // beginCallback: uploadBegin, // Don't ask me, only way I made it work as of 1.5.1
                    // // progressCallback: uploadProgress,
                    // progress: uploadProgress,
                    // })
                    // .then((response) => {
                    //     console.log(response, '<<< Response');
                    //     if (response.statusCode == 200) {
                    //     //You might not be getting a statusCode at all. Check
                    //     console.log('FILES UPLOADED!');
                    //     } else {
                    //     console.log('SERVER ERROR');
                    //     }
                    // })
                    // .catch((err) => {
                    //     alert("inside here")
                    //     if (err.description) {
                    //     switch (err.description) {
                    //         case 'cancelled':
                    //         console.log('Upload cancelled');
                    //         break;
                    //         case 'empty':
                    //         console.log('Empty file');
                    //         default:
                    //         //Unknown
                    //     }
                    //     } else {
                    //     //Weird
                    //     }
                    //     console.log(err);
                    // });

            }else {
                // Send Image file here
            }
        }
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