import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import ConsultCard from '../../../Components/ConsultCard';
import MyAppText from '../../../Components/MyAppText';

class GeneralPractise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://conduit.detechnovate.net/public/api/conduithealth/doctors/lang/slot/1`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.data,
          error: res.error || null,
          loading: false,
        });
        console.log('Array', res.data)
        this.arrayholder = res.data;
        
      })
      .catch(error => {
        this.setState({ error, loading: false });
        alert('Network Error, Please Try Again');
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.last_name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search Doctor..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <ActivityIndicator  size="large" color="#51087E" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            // var newArrayDataOfOjbect = Object.values(item.languages)
            // console.log('Converted Array', newArrayDataOfOjbect, typeof(newArrayDataOfOjbect))
            console.log('slotsss', item.slots )
            return (
              <ConsultCard
              lang= {item.languages.map(
                (lang, index) => <MyAppText key= {index}>{lang.language} </MyAppText>
              )
              }
              experience= {`${item.experience} Years Experience`}
              qualification= {item.qualification}
              specialty= {item.specialty}
              pressed = {
                (item.slots === null) ? ()=> alert('Doctor Not Available') : ()=> this.props.navigation.navigate('Slot', {doctor_id: item.id})
                
              }
              image = {item.image}
              name= {`${item.title} ${item.name} ${item.last_name}`}
              // available= {item.slots.appointment_start }
              available = {
                (item.slots === null) ? 'Not Available' : item.slots.appointment_start
              }
              />
            )
          } 
        }
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default GeneralPractise;