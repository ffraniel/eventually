import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import Loading from './components/Loading';
import EventList from './components/EventList';
import handleErrors from './utilities/handleError';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      events: [],
      hasMoreItems: null,
      currentPage: 1,
      inputValue: '',
      searchedForValue: null,
      activeSearch: false,
    };
    this.resetEventsList = this.resetEventsList.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.fetchMoreItems = this.fetchMoreItems.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.searchEvents = this.searchEvents.bind(this);
    this.fetchMoreSearchedItems = this.fetchMoreSearchedItems.bind(this);
  }

  componentDidMount(){
    this.getEvents();
  }

  resetEventsList (){
    if(this.state.events.length > 1) {
      this.setState({
        events: [],
        searchedForValue: null,
      })
    }
  }

  getEvents(){
    this.resetEventsList();
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

  changeHandler (event) {
      this.setState({
        inputValue: event.nativeEvent.text
      })
  }

  searchEvents(){
    this.setState({
      loading: true,
      currentPage: 1,
      searchedForValue: this.state.inputValue,
      activeSearch: true,
    })
    return fetch(`https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX&q=${this.state.inputValue}&page=${this.state.currentPage}`)
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

  fetchMoreSearchedItems() {
    this.setState({
      loading: true,
      currentPage: this.state.currentPage++,
    })
    return fetch(`https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX&q=${this.state.inputValue}&page=${this.state.currentPage}`)
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

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <Loading />}
          <ScrollView>
            <Text style={styles.heading} onPress={this.getEvents} >Eventually</Text>
            <Text style={styles.subHeading}>events listing search</Text>
            <FormLabel>Search</FormLabel>
            <FormInput style={styles.formInput} onChange={this.changeHandler}/>
            <Button onPress={this.searchValue} 
              style={styles.searchButton}
              onPress={this.searchEvents}
              title="SEARCH"
              color={this.state.loading ? "red" : "#BADA55" }
              accessibilityLabel="Search for events"
              value={this.state.inputValue}/>
            {this.state.searchedForValue && 
              <Text style={styles.postSearchMessage}>You searched for: <Text style={styles.searchedForValue}> '{this.state.searchedForValue}'</Text>
              </Text>}
            <EventList events={this.state.events} hasMoreItems={this.state.hasMoreItems} fetchMoreItems={this.fetchMoreItems} loading={this.state.loading} fetchMoreSearchedItems={this.fetchMoreSearchedItems} activeSearch={this.state.activeSearch} searchedForValue={this.state.searchedForValue} />
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
    fontSize: 16,
    fontFamily: 'monospace',
  },
  subHeading: {
    fontSize: 8,
    fontFamily: 'monospace',
    padding: 8,
    marginLeft: 10,
  },
  postSearchMessage: {
    marginLeft: 8,
    paddingLeft:8,
  },
  searchedForValue: {
    color:'#d82aff',
  }
});
