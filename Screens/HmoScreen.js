import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import axios from 'axios';
class FlatListDemo extends Component {
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
    const url = `https://conduit.detechnovate.net/public/api/conduithealth/hmo`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res.data)
        this.setState({
          data: res.data,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.data;
        console.log("array", this.arrayholder)
      })
      .catch(error => {
        this.setState({ error, loading: false });
        alert('Network Error, Please Try Again Later')
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
      const itemData = `${item.hmo.toUpperCase()}`;
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
        placeholder="Search HMO..."
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
          renderItem={({ item }) => (
            <ListItem
            onPress= {() => this.props.navigation.navigate('Login')}
              leftAvatar={{ source: { uri: item.image} }}
              title={`${item.hmo}`}
              // subtitle= {item.created_at}
            />
          )}
          keyExtractor={item => item.client_id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default FlatListDemo;