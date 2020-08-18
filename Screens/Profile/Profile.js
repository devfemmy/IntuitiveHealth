import React from 'react';
import { View, StyleSheet,Text, ScrollView, Dimensions } from 'react-native';
import NotificationCard from '../../Components/NotificationCard';
import ProfileCard from '../../Components/ProfileCard';
import InnerBtn from '../../Components/InnerBtn';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#F7F7FA', padding: 20 }]}>
                        <View style= {styles.profileCont}>
                <ProfileCard>
                    <Text style= {styles.textStyle}>
                    First name
                    </Text>
                    <Text style= {styles.textStyle2}>
                    John Doe
                    </Text>
                </ProfileCard>
                <ProfileCard>
                    <Text style= {styles.textStyle}>
                    First name
                    </Text>
                    <Text style= {styles.textStyle2}>
                    John Doe
                    </Text>
                </ProfileCard>
                <ProfileCard>
                    <Text style= {styles.textStyle}>
                    First name
                    </Text>
                    <Text style= {styles.textStyle2}>
                    John Doe
                    </Text>
                </ProfileCard>
                <ProfileCard>
                    <Text style= {styles.textStyle}>
                    First name
                    </Text>
                    <Text style= {styles.textStyle2}>
                    John Doe
                    </Text>
                </ProfileCard>
                <InnerBtn text= "Edit" color= "#fff" bg= "#51087E" />
            </View>
    </View>
  );
   
  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#F7F7FA', padding: 20 }]}>
    <View style= {styles.profileCont}>
        <ProfileCard>
        <Text style= {styles.textStyle}>
        Allergies
        </Text>
        <Text style= {styles.textStyle2}>
        Fish Eggs
        </Text>
        </ProfileCard>
        <ProfileCard>
        <Text style= {styles.textStyle}>
        Current Medications
        </Text>
        <Text style= {styles.textStyle2}>
        No
        </Text>
        </ProfileCard>
        <ProfileCard>
        <Text style= {styles.textStyle}>
        Post Medications
        </Text>
        <Text style= {styles.textStyle2}>
        No
        </Text>
        </ProfileCard>
        <ProfileCard>
        <Text style= {styles.textStyle}>
        Chronoic Disease
        </Text>
        <Text style= {styles.textStyle2}>
        No
        </Text>
        </ProfileCard>
        <ProfileCard>
        <Text style= {styles.textStyle}>
        Chronoic Disease
        </Text>
        <Text style= {styles.textStyle2}>
        Injuries
        </Text>
        </ProfileCard>
        <ProfileCard>
        <Text style= {styles.textStyle}>
        Surgeries
        </Text>
        <Text style= {styles.textStyle2}>
        No
        </Text>
        </ProfileCard>
        <InnerBtn text= "Edit" color= "#fff" bg= "#51087E" />
        </View>
        </View>
  );
  const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#F7F7FA', padding: 20 }]}>
    <View style= {styles.profileCont}>
        <ProfileCard>
        <Text style= {styles.textStyle}>
        Smoking Habit
        </Text>
        <Text style= {styles.textStyle2}>
        I dont smoke
        </Text>
        </ProfileCard>
        <ProfileCard>
        <Text style= {styles.textStyle}>
        Alcohol Consumption
        </Text>
        <Text style= {styles.textStyle2}>
       Social
        </Text>
        </ProfileCard>
        <ProfileCard>
        <Text style= {styles.textStyle}>
        Activity Level
       
        </Text>
        <Text style= {styles.textStyle2}>
        Athletic (Very High)
        </Text>
        </ProfileCard>
        <ProfileCard>
        <Text style= {styles.textStyle}>
       Food Preference
        </Text>
        <Text style= {styles.textStyle2}>
        Vegan
        </Text>
        </ProfileCard>
        <ProfileCard>
        <Text style= {styles.textStyle}>
       Occupation
        </Text>
        <Text style= {styles.textStyle2}>
        IT Professional
        </Text>
        </ProfileCard>
        <InnerBtn text= "Edit" color= "#fff" bg= "#51087E" />
        </View>
        </View>
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#51087E' }}
    />
  );
   
  const initialLayout = { width: Dimensions.get('window').width };
const Profilepage = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Personal' },
      { key: 'second', title: 'Medical' },
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
    textStyle: {
        color: '#9B9B9B'
    },
    textStyle2: {
        color: '#464646',
        fontWeight: 'bold'
    },
    profileCont: {

    }
});

export default Profilepage