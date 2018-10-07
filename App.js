import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Loading from './components/Loading';
import EventList from './components/EventList';
import handleErrors from './utilities/handleError';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      events: [],
      filteredEvents: [],
      filters: [],
      hasMoreItems: null,
      currentPage: 1,
    };
    this.resetEventsList = this.resetEventsList.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.fetchMoreItems = this.fetchMoreItems.bind(this);
  }

  componentDidMount(){
    this.getEvents();
  }

  resetEventsList (){
    if(this.state.events.length > 1) {
      this.setState({
        events: [],
      })
    }
  }

  someFunction(){
    console.log("some function was called")
  }

  getEvents(){
    this.resetEventsList();
    // console.log("get all events called with the filters: ", this.state.filters);
    return fetch('https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX')
      .then(handleErrors)
      .then((resBuffer)=>{
        return resBuffer.json();
      })
      .then((res)=>{
        this.setState({
          events: res.events,
          loading: false,
          hasMoreItems: res.pagination.has_more_items,
          currentPage: res.pagination.page_number,
        });
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  fetchMoreItems (){
    if(this.state.hasMoreItems) {
      this.setState({
        currentPage: this.state.currentPage++,
        loading:true,
      })
      return fetch(`https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX&page=${this.state.currentPage}`)
      .then(handleErrors)
      .then((resBuffer)=>{
        return resBuffer.json();
      })
      .then((res)=>{
        let currentEvents = this.state.events;
        this.setState({
          events: currentEvents.concat(res.events),
          loading: false,
          hasMoreItems: res.pagination.has_more_items,
          currentPage: res.pagination.page_number,
        });
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <Loading />}
          <ScrollView>
            <Text style={styles.heading}>Eventually</Text>

            <FormLabel>Search</FormLabel>
            <FormInput onChangeText={this.someFunction}/>

            <EventList events={this.state.events} hasMoreItems={this.state.hasMoreItems} fetchMoreItems={this.fetchMoreItems} loading={this.state.loading}/>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6defc",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  heading: {
    color: '#2d0438',
    backgroundColor: '#b1ffa3',
    padding: 20,
    borderStyle: 'solid',
    borderColor: 'black',
    borderBottomWidth: 2,
    fontSize: 14,
  },
});
