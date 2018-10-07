import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button, Linking, TouchableOpacity, Dimensions } from "react-native";
import EventWebView from './EventWebView';

const year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
    let eStart = event.start.utc; 
    let eEnd = event.end.utc;
    let eThumbnail = event.logo ? event.logo.url : '';

    const date = {
      day: Number(eStart.split("").slice(8, 10).join("")),
      month: Number(eStart.split("").slice(5, 7).join("")),
      year: Number(eStart.split("").slice(0, 4).join("")),
      monthName: year[Number(eStart.split("").slice(5, 7).join("")) - 1],
    };

    return (
      <View style={styles.event}> 
        <Text style={styles.eventTitle}>{eName} </Text>
        <Text style={styles.eventDate}>{date.day}/{date.month}/{date.year}</Text>

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
          title={this.state.toggleOpen ? "Hide details" : "See event type"}
          color={this.state.toggleOpen? "rgb(153, 0, 51)": "#BADA55" }
          accessibilityLabel="See event style for this listing"
          style={styles.eventButton}
        /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  event: {
    borderColor: "grey",
    borderBottomWidth: 2,
    borderStyle: "solid",
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  eventTitle: {
    color: "#2d0438",
    fontSize: 24,
    alignItems: "flex-start",
    justifyContent:'center',
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
    alignItems: 'center',
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
  }
});

export default EventItem;
