import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
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

  getEvents(){
    this.resetEventsList();
    // console.log("get all events called with the filters: ", this.state.filters);
    return fetch('https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX')
      .then(handleErrors)
      .then((resBuffer)=>{
        return resBuffer.json();
      })
      .then((res)=>{
        // console.log("all results", res)
        // console.log("the pagination: ", pagination)
        // console.log("hasMoreresults: ", res.pagination.has_more_items)
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
    // let nextPage = this.state.currentPage++;
    if(this.state.hasMoreItems) {
      this.setState({
        currentPage: this.state.currentPage++,
        loading:true,
      })
      console.log("the state", this.state)
      return fetch(`https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX&page=${this.state.currentPage}`)
      .then(handleErrors)
      .then((resBuffer)=>{
        return resBuffer.json();
      })
      .then((res)=>{
        let currentEvents = this.state.events;
        console.log("the second lot of events: ", res.events)
        this.setState({
          events: currentEvents.concat(res.events),
          loading: false,
          hasMoreItems: res.pagination.has_more_items,
          currentPage: res.pagination.page_number,
        });
        console.log("current events = :", currentEvents);
      })
      .catch((error)=>{
        console.log(error);
      })
      console.log("EVEN MORE EVENTS")
    }
    else {
      console.log("either no more items available")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <Loading />}
          <ScrollView>
            <Text style={styles.heading}>Eventually</Text>
            <EventList events={this.state.events} hasMoreItems={this.state.hasMoreItems} fetchMoreItems={this.fetchMoreItems}/>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  heading: {
    color: 'white',
    paddingTop:10,
    fontSize: 14,
  },
});
