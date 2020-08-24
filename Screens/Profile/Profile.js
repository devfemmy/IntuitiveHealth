import React from 'react';
import { View, StyleSheet,Text,Switch, ScrollView, Dimensions } from 'react-native';
import NotificationCard from '../../Components/NotificationCard';
import ProfileCard from '../../Components/ProfileCard';
import InnerBtn from '../../Components/InnerBtn';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MyAppText from '../../Components/MyAppText';
import ProfileInput from '../../Components/ProfileInput';
import PickerInput from '../../Components/PickerInput';
import VitalInput from '../../Components/VitalInput';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Profilepage = () => {
  const [dob, setDob] = React.useState('java');
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isEnabled2, setIsEnabled2] = React.useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#F7F7FA', padding: 20 }]}>
              <View style= {styles.profileCont}>
                <View style= {styles.inputContainer}>
                    <View style= {styles.flexContainer}>
                        <ProfileInput width= "45%" label= "First name" />
                        <ProfileInput width= "45%"  label= "Last name" />
                    </View>
                    <ProfileInput keyboardType= "numeric" label= "Phone Number" />
                    <ProfileInput keyboardType= "email-address" label= "Email Address" />
                    <ProfileInput keyboardType= "default" label= "Location" />
                    <View style= {styles.flexContainer}>
                        <ProfileInput width= "100%" label= "Occupation" />
                    </View>
                    <View style= {styles.flexContainer}>
                      <View style= {styles.pickerContainer}>
                        <PickerInput
                          placeholder= "Marital Status"
                          items= {[
                            { label: 'Single', value: 'single' },
                            { label: 'Mariied', value: 'married' },
                            { label: 'Divorce', value: 'divorce' },
                        ]} />
                      </View>
                      <View style= {styles.pickerContainer}>
                        <PickerInput
                          placeholder= "Gender"
                          items= {[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                        ]} />
                      </View>
                    </View>
                    <View style= {styles.flexContainer}>
                      <View style= {styles.pickerContainer}>
                        <PickerInput
                          placeholder= "Select State"
                          items= {[
                            { label: 'Lagos', value: 'lagos' },
                            { label: 'Osun', value: 'osun' },
                        ]} />
                      </View>
                      <View style= {styles.pickerContainer}>
                        <PickerInput
                          placeholder= "Select City"
                          items= {[
                            { label: 'Ikeja', value: 'ikeja' },
                            { label: 'Ipaja', value: 'ipaja' },
                        ]} />
                      </View>
                    </View>
                    <View>
                      <PickerInput 
                      placeholder= "Select Country"
                      items= {[
                        { label: 'Nigeria', value: 'nga' },
                        { label: 'Ghana', value: 'ghn' },
                    ]} />
                    </View>
                </View>
                <InnerBtn text= "Save" color= "#fff" bg= "#51087E" />
            </View>
    </View>
  );
   
  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#F7F7FA', padding: 20 }]}>
        <View style= {styles.profileCont}>
              <MyAppText style= {styles.bmiText}>
              BMI (Body Mass Index)
              </MyAppText>
              <VitalInput indicator= "Metres" keyboardType= "numeric" label= "Height" />
              <VitalInput indicator= "Kg" keyboardType= "numeric" label= "Weight" />
              <View style= {styles.resultContainer}>
                    <MyAppText style= {styles.bmiStyle}>
                      Your BMI is:
                    </MyAppText>
                    <View style= {styles.flexContainer}>
                      <MyAppText style= {styles.bmiStyle2}>
                        26
                      </MyAppText>
                      <TouchableOpacity style= {styles.touchbtn}>
                        <MyAppText style= {styles.btnTextStyle}>LOW</MyAppText>
                      </TouchableOpacity>
                    </View>
              </View>
              <InnerBtn text= "Save" color= "#fff" bg= "#51087E" />
        </View>
        </View>
  );
  const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#F7F7FA', padding: 20 }]}>
        <View style= {styles.profileCont}>
        <View style= {styles.switchContainer}>
                        <MyAppText style= {styles.textStyle5}>Do you smoke?</MyAppText>
                        <Switch
                            trackColor={{ false: "#B4BBC6", true: "#880ED4" }}
                            thumbColor={isEnabled ? "white" : "white"}
                            ios_backgroundColor="#B4BBC6"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        
          </View>
          <View style= {styles.switchContainer}>
                        <MyAppText style= {styles.textStyle5}>Do you take Alcohol?</MyAppText>
                        <Switch
                            trackColor={{ false: "#B4BBC6", true: "#880ED4" }}
                            thumbColor={isEnabled2 ? "white" : "white"}
                            ios_backgroundColor="#B4BBC6"
                            onValueChange={toggleSwitch2}
                            value={isEnabled2}
                        />
                        
          </View>
          <View>
                      <PickerInput 
                      placeholder= "How active is your lifestyle?"
                      items= {[
                        { label: 'Active', value: 'active' },
                        { label: 'Inactive', value: 'inactive' },
                    ]} />
            </View>
            <View style= {styles.lastcontainer}>
                      <PickerInput 
                      placeholder= "Main Diet?"
                      items= {[
                        { label: 'Vegetarian', value: 'vege' },
                       
                    ]} />
            </View>
            <InnerBtn text= "Save" color= "#fff" bg= "#51087E" />
        </View>
    </View>
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      labelStyle= {styles.labelStyle}
      indicatorStyle={{ backgroundColor: 'white'}}
      style={{ backgroundColor: '#51087E' }}
    />
  );
   
    const initialLayout = { width: Dimensions.get('window').width };
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Personal' },
      { key: 'second', title: 'BMI' },
      { key: 'third', title: 'Lifestyle' },
    ]);
   
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third: ThirdRoute
    });
    return (
        <ScrollView style= {styles.container}>
        <TabView
        renderTabBar = {renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
      },
    container: {
        backgroundColor: '#F7F7FA',
        flex: 1,
        // padding: 20
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
      textAlign: 'center'
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

export default Profilepage