import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import EventItem from './EventItem';

let myArray = [1, 2, 3, 4, 5, 6, 7, 8]

class EventList extends Component {
  render() {
    return (
      <View style={styles.EventListView}>
        {myArray.map((item, key)=>{
          return(
            <EventItem key={item} />
          )
        })}
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  EventListView: {
  },
})

export default EventList;