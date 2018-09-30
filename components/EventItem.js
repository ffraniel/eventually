import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

class EventItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleOpen: false
    }
    this.expandEvent = this.expandEvent.bind(this);
  }

  expandEvent(){
    this.setState({
      toggleOpen: !this.state.toggleOpen
    })
  }

  render(){
    let event = this.props.event;
    return(
      <View style={styles.event} >
        <Text style={styles.eventTitle}> {event.name} </Text>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={this.state.toggleOpen ? styles.expandedEvent : styles.hiddenEvent}>Style: {event.style}</Text>
        <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
          style={this.state.toggleOpen ? {width: 200, height: 200} : {width: 0, height: 0}} />
        <Button
          onPress={this.expandEvent}
          title={this.state.toggleOpen ? "Hide details ^" : "See event type"}
          color="#841584"
          accessibilityLabel="See event style for this listing"
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  EventItem: {
    backgroundColor: 'blue',
    color: 'white'
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
    alignItems: "flex-start",
  },
  eventDate: {
    color: "white",
    fontSize: 16,
    alignItems: "flex-start"
  },
  hiddenEvent : {
    height: 0,
    fontSize: 16,
    color: 'grey',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: "solid",
  },
  expandedEvent: {
    fontSize: 16,
    color: 'rgb(247, 242, 242)',
    alignItems: 'center',
    height: 30,
  }
});

export default EventItem;