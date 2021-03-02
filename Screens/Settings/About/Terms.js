import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Alert, ScrollView,ActivityIndicator, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import { IGNORED_TAGS, alterNode, makeTableRenderer } from 'react-native-render-html-table-bridge';
import HTML from 'react-native-render-html';
import axios from '../../../axios-req';
import errorHandler from '../../ErrorHandler/errorHandler';

const Terms = (props) => {
    const [loading, setLoading] = useState(true);
    const [content, setData] = useState('');
    const [error, setError] = useState(false)
    const html = `${content}`;
    
    
    useEffect(() => {
      const id = AsyncStorage.getItem('Mytoken').then(
          res => {
             console.log('synch', res)
              axios.get('conduithealth/terms', {headers: {Authorization: res}})
              .then(
                
                  res => {
                      setLoading(false)
                      console.log("profile-toks", res.data)  
                      const contents = res.data.data.content;
                      setData(contents)                   
                  }
              )
              .catch(err => {
                  setError(true)
  
              })
          }
      )
      .catch( err => {console.log(err)}) 
      
  
    }, []);
    const config = {
        WebViewComponent: WebView
    };
    
    const renderers = {
      table: makeTableRenderer(config)
    };
    const htmlConfig = {
        alterNode,
        renderers,
        ignoredTags: IGNORED_TAGS
      };
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
                <View style= {styles.profileCont}>
                    <HTML html={html} {...htmlConfig}/>

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        padding: 20
    },
    inputContainer: {
      marginBottom: 50
    },
    textStyle: {
        color: '#9B9B9B'
    },
    textStyle2: {
        color: '#464646',
        fontWeight: 'bold'
    },
    labelStyle: {
      fontFamily: 'HammersmithOne-Regular' 
    },
    switchContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 40,
      marginBottom: 15
  },
    profileCont: {
      paddingVertical: 20
    },
    lastcontainer: {
      marginVertical: 15
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    pickerContainer: {
      width: '45%',
      marginVertical: 8
    },
    bmiText: {
      color: '#51087E',
      fontSize: 28,
      marginBottom: 25,
      textAlign: 'left'
    },
    resultContainer: {
      marginVertical: 40
    },
    bmiStyle: {
      fontSize: 22
    },
    bmiStyle2: {
      fontSize: 34,
      color: '#6C0BA9'
    },
    touchbtn: {
      backgroundColor: '#D30C0C0B',
      borderWidth: 1,
      borderColor: '#E6C300',
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      height: 35
    },
    btnTextStyle: {
      color: '#E6C300'
    }
});

export default errorHandler (Terms, axios);
