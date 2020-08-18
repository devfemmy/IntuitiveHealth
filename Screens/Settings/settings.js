import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import ProfileCard from '../../Components/ProfileCard';
import Icon from '../../assets/sliders/images/save.svg';
import { AuthContext } from '../../Navigations/DrawerNav';

const SettingPage = (props) => {
    const { signOut} = React.useContext(AuthContext);
    return (
        <ScrollView style= {styles.container}>
           <View>
               <TouchableOpacity>
                <ProfileCard>
                        <Text style= {styles.textStyle}>About Conduit Telehealth</Text>
                    </ProfileCard>
               </TouchableOpacity>
               <TouchableOpacity>
                <ProfileCard>
                        <Text style= {styles.textStyle}>Privacy Policy</Text>
                    </ProfileCard>
               </TouchableOpacity>
               <TouchableOpacity>
                <ProfileCard>
                        <Text style= {styles.textStyle}>Rate Conduit Telehealth App</Text>
                    </ProfileCard>
               </TouchableOpacity>
               <TouchableOpacity   onPress={() => signOut(props)}>
                <ProfileCard>
                        <Text style= {styles.textStyle2}>Logout</Text>
                        <Icon width= {25} height= {25} />

                    </ProfileCard>
               </TouchableOpacity>

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
    textStyle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    textStyle2: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#6C0BA9'
    }
});

export default SettingPage;