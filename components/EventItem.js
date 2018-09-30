import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class EventItem extends Component {
  render(){
    return(
      <Text>One listing</Text>
    )
  }
}

const styles = StyleSheet.create({
  EventItem: {
    backgroundColor: 'blue',
  }
});

export default EventItem;