import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image, Button, Linking, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import EventWebView from './EventWebView';

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOpen: false,
    };
    this.expandEvent = this.expandEvent.bind(this);
  }

  expandEvent() {
    const { toggleOpen } = this.state;
    this.setState({
      toggleOpen: !toggleOpen,
    });
  }

  render() {
    const { event } = this.props;
    const eName = event.name.text;
    const eDescription = event.description.html;
    const eLink = event.url;
    const eStart = event.start.utc;
    const eThumbnail = event.logo ? event.logo.url : '';

    const date = {
      day: Number(eStart.split('').slice(8, 10).join('')),
      month: Number(eStart.split('').slice(5, 7).join('')),
      year: Number(eStart.split('').slice(0, 4).join('')),
    };
    const { toggleOpen } = this.state;
    const eventItemRef = React.createRef();
    return (
      <View style={styles.event}>
        <Text style={styles.eventTitle}>{eName}</Text>
        <Text style={styles.eventDate}>
          {date.day}
          /
          {date.month}
          /
          {date.year}
        </Text>
        <View style={toggleOpen ? styles.expandedDetails : styles.hiddenDetails}>
          { eThumbnail.length > 0
            && (
              <Image
                source={{ uri: eThumbnail }}
                style={toggleOpen ? { width: 200, height: 200 } : { width: 0, height: 0 }}
              />
            )
          }
          <TouchableOpacity onPress={() => Linking.openURL(eLink)} accessibilityLabel="Navigate to the full event page in your web browser.">
            <Text style={styles.linkEvent}>See Full Listing</Text>
          </TouchableOpacity>
          <EventWebView descriptionHTML={eDescription} toggleOpen={toggleOpen} />
        </View>

        <Button
          onPress={this.expandEvent}
          title={toggleOpen ? 'Hide details' : 'See event type'}
          color={toggleOpen ? 'rgb(153, 0, 51)' : '#BADA55'}
          accessibilityLabel="See event style for this listing"
          style={styles.eventButton}
          ref={eventItemRef}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  event: {
    borderColor: 'grey',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTitle: {
    color: '#2d0438',
    fontSize: 24,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
  },
  eventDate: {
    color: '#2d0438',
    fontSize: 16,
    alignItems: 'flex-start',
  },
  expandedDetails: {
    flex: 1,
  },
  hiddenDetails: {
    height: 0,
  },
  linkEvent: {
    color: 'blue',
    textDecorationLine: 'none',
    justifyContent: 'center',
  },
  webView: {
    flex: 1,
    height: 300,
  },
  webViewClosed: {
    height: 0,
    width: 0,
  },
  eventButton: {
    margin: 10,
  },
});

EventItem.propTypes = {
  event: PropTypes.object,
};

export default EventItem;
