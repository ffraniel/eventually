import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Loading from './components/Loading';
import EventList from './components/EventList';
import handleErrors from './utilities/handleError';
import testList from './testList';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      events: [],
      filteredEvents: [],
      filters: [],
      paginationKey: '',
      hasMoreItems: null,
    };
    this.getEvents = this.getEvents.bind(this);
    this.fetchMoreItems = this.fetchMoreItems.bind(this);
  }

  componentDidMount(){
    this.getEvents();
  }

  getEvents(){
    // console.log("get all events called with the filters: ", this.state.filters);
    return fetch('https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX')
      .then(handleErrors)
      .then((resBuffer)=>{
        return resBuffer.json();
      })
      .then((res)=>{
        // let currentEvents = this.state.events;
        // currentEvents.push(res.events);
        // console.log("current events = :", currentEvents)
        let pagination = res.pagination.continuation || null;
        this.setState({
          events: res.events,
          loading: false,
          hasMoreItems: res.pagination.has_more_items,
          paginationKey: pagination
        });
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  fetchMoreItems (){
    if(this.state.hasMoreItems) {
      this.setState({
        loading:true,
      })
      console.log("EVEN MORE EVENTS")
      // then return fetch using the paginationKey held in state (continuation)
    }
    else {
      console.log("No more left")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <Loading />}
        {!this.state.loading && (
          <ScrollView>
            <Text style={styles.heading}>Eventually</Text>
            <EventList events={this.state.events} hasMoreItems={this.state.hasMoreItems} fetchMoreItems={this.fetchMoreItems}/>
          </ScrollView>
        )}
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
