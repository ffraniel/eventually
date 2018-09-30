import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import EventItem from './EventItem';

class EventList extends Component {
  render() {
    return (
      <View style={styles.EventListView}>
        {this.props.events.map((event)=>{
          return(
            <EventItem key={event.name} event={event} />
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