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
              // const results = await RNFetchBlob.fs.readFile(res.uri, 'base64');
              // console.log('base643', results)
            
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
               
        RNFetchBlob.fetch('POST', 'https://conduit.detechnovate.net/public/api/user/doc/upload', {
            Authorization : myToken,
            // otherHeader : "pdf",
            'Content-Type' : 'multipart/form-data',
          }, [
            // part file from storage
            { name : 'test3', upload_file : filename, type: fileType, data: pdfUri
          
        },
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
          
          fetch(
            'https://conduit.detechnovate.net/public/api/user/doc/upload',
            {
              method: 'post',
              data: data,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': myToken,
              },
            }
          ).then( (res) => {
            alert("Here")
            console.log('res', res)
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
                        formData.append("upload_file",imageUri)
                        formData.append("name",filename)
                        alert('senttt');
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
                <InnerBtn onPress= {() => "pressed"} bg= "#51087E" color= "white" text= "Upload Document" />
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