import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import EventItem from './EventItem';

class EventList extends Component {
  render() {
    return (
      <View style={styles.EventListView}>
        {this.props.events.map((event)=>{
          return (
            <EventItem key={event.id} event={event} />
          )
        })}
        {this.props.hasMoreItems &&
          <Button 
            onPress={this.props.fetchMoreItems}
            title={"Show more"}
            color={"rgb(153, 0, 51)"}
            accessibilityLabel="Show more events"
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  EventListView: {
  },
})

export default EventList;