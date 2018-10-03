import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button, Linking, TouchableOpacity } from "react-native";

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
    // {console.log(eThumbnail)}

    return (
      <View style={styles.event}> 
        <Text style={styles.eventTitle}>{this.props.num}: {eName} </Text>
        <Text style={styles.eventDate}>{eStart}</Text>

        <View style={ this.state.toggleOpen ? styles.expandedDetails : styles.hiddenDetails } >
          {eThumbnail.length > 0 && <Image source={{ uri: eThumbnail }}
            style={this.state.toggleOpen ? { width: 200, height: 200 } : { width: 0, height: 0 } }
          />}   
          <Text style={this.state.toggleOpen ? styles.expandedEvent : styles.hiddenEvent } innerHTML={eDescription}>Text</Text>      
          <TouchableOpacity onPress={() => Linking.openURL(eLink)} accessibilityLabel="Navigate to the full event page in your web browser." >
            <Text style={styles.linkEvent}>Full Listing</Text>
          </TouchableOpacity>
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
    color: "white",
    fontSize: 24,
    alignItems: "flex-start"
  },
  eventDate: {
    color: "white",
    fontSize: 16,
    alignItems: "flex-start"
  },
  hiddenEvent: {
    height: 0,
    fontSize: 16,
    color: "grey",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    borderStyle: "solid"
  },
  expandedEvent: {
    fontSize: 16,
    color: "rgb(247, 242, 242)",
    alignItems: "center",
    height: 30
  },
  expandedDetails: {
    flex: 1,
  },
  hiddenDetails: {
    height: 0,
  }, 
  linkEvent: {
    color: 'blue', 
  },
});

export default EventItem;
