import React from 'react';
import {
  StyleSheet, View, Button, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

const EventList = (props) => {
  const {
    activeSearch, fetchMoreItems, hasMoreItems, events, fetchMoreSearchedItems, loading,
  } = props;
  const noSearchEventItemRef = React.createRef();
  const activeSearchEventItemRef = React.createRef();
  return (
    <View style={styles.EventListView}>
      {events && events.map(event => <EventItem key={event.id} event={event} />)}
      {hasMoreItems
      && events.length > 1
      && !activeSearch
      && (
      <Button
        onPress={fetchMoreItems}
        title="Show more"
        color="rgb(153, 0, 51)"
        accessibilityLabel="Show more events"
        ref={noSearchEventItemRef}
      />
      )
      }
      {hasMoreItems
      && events.length > 1
      && activeSearch
      && (
      <Button
        title="Show more from search"
        onPress={fetchMoreSearchedItems}
        color="red"
        accessibilityLabel="Search for more events"
        ref={activeSearchEventItemRef}
      />
      )
      }
      {!hasMoreItems
      && !loading
      && <Text style={styles.noItems}>No more items to show</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  EventListView: {
  },
  noItems: {
    color: '#2d0438',
  },
});

EventList.propTypes = {
  events: PropTypes.array,
  hasMoreItems: PropTypes.bool,
  fetchMoreItems: PropTypes.func,
  loading: PropTypes.bool,
  fetchMoreSearchedItems: PropTypes.func,
  activeSearch: PropTypes.bool,
};

export default EventList;
