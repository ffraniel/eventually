import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import EventItem from './EventItem';
import PropTypes from 'prop-types';

class EventList extends Component {
  render() {
    return (
      <View style={styles.EventListView}>
        {this.props.events && this.props.events.map((event)=>{
          return (
            <EventItem key={event.id} event={event} />
          )
        })}
        {this.props.hasMoreItems && this.props.events.length > 1 && !this.props.activeSearch &&
          <Button 
            onPress={this.props.fetchMoreItems}
            title={"Show more"}
            color={"rgb(153, 0, 51)"}
            accessibilityLabel="Show more events"
          />
        }
        {this.props.hasMoreItems && this.props.events.length > 1 && this.props.activeSearch &&
          <Button 
            title={"Show more from search"}
            onPress={this.props.fetchMoreSearchedItems}
            color={"red"}
            accessibilityLabel={"Search for more events"}
          />
        }
        {!this.props.hasMoreItems && !this.props.loading && <Text style={styles.noItems} >No more items to show</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  EventListView: {
  },
  noItems:{
    color: '#2d0438',
  }
})

EventList.propTypes = {
  events: PropTypes.array,
  hasMoreItems: PropTypes.bool,
  fetchMoreItems: PropTypes.func,
  loading: PropTypes.bool,
  fetchMoreSearchedItems: PropTypes.func,
  activeSearch: PropTypes.bool,
  searchedForValue: PropTypes.string,
}

export default EventList;