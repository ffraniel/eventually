import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button, Linking, TouchableOpacity, Dimensions } from "react-native";
import EventWebView from './EventWebView';

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOpen: false
    };
    this.expandEvent = this.expandEvent.bind(this);
  }

  expandEvent() {
    this.setState({
      toggleOpen: !this.state.toggleOpen
    });
  }

  render() {
    let event = this.props.event;

    let eName = event.name.text;
    let eDescription = event.description.html;
    let eLink = event.url;
    let eStart = event.start.utc; // review this when data is being passed through
    let eEnd = event.end.utc;
    let eThumbnail = event.logo ? event.logo.url : '';

    return (
      <View style={styles.event}> 
        <Text style={styles.eventTitle}>{this.props.num}: {eName} </Text>
        <Text style={styles.eventDate}>{eStart}</Text>

        <View style={ this.state.toggleOpen ? styles.expandedDetails : styles.hiddenDetails } >
          {eThumbnail.length > 0 && <Image source={{ uri: eThumbnail }}
            style={this.state.toggleOpen ? { width: 200, height: 200 } : { width: 0, height: 0 } }
          />}         
          <TouchableOpacity onPress={() => Linking.openURL(eLink)} accessibilityLabel="Navigate to the full event page in your web browser." >
            <Text style={styles.linkEvent}>See Full Listing</Text>
          </TouchableOpacity>
          <EventWebView descriptionHTML={eDescription} toggleOpen={this.state.toggleOpen} />
        </View>

        <Button
          onPress={this.expandEvent}
          title={this.state.toggleOpen ? "Hide details ^" : "See event type"}
          color={this.state.toggleOpen? "rgb(153, 0, 51)": "#BADA55" }
          accessibilityLabel="See event style for this listing"
        /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  EventItem: {
    backgroundColor: "blue",
    color: "white"
  },
  event: {
    borderColor: "grey",
    borderBottomWidth: 2,
    borderStyle: "solid",
    width: 330
  },
  eventTitle: {
    color: "#2d0438",
    fontSize: 24,
    alignItems: "flex-start"
  },
  eventDate: {
    color: "#2d0438",
    fontSize: 16,
    alignItems: "flex-start"
  },
  expandedDetails: {
    flex: 1,
  },
  hiddenDetails: {
    height: 0,
  }, 
  linkEvent: {
    color: 'blue',
    textDecorationLine: "none",
    padding: 20,
    marginLeft: Dimensions.get('window').width * 0.3,
  },
  webView: {
    flex: 1,
    height: 300,
  },
  webViewClosed: {
    height: 0,
    width: 0,

  },
});

export default EventItem;
