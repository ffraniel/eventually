import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
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

    this.getEvents = this.getEvents.bind(this);
    this.resetEventsList = this.resetEventsList.bind(this);
    this.fetchMoreItems = this.fetchMoreItems.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.searchEvents = this.searchEvents.bind(this);
    this.fetchMoreSearchedItems = this.fetchMoreSearchedItems.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    this.resetEventsList();
    return fetch(
      'https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX',
    )
      .then(handleErrors)
      .then(resBuffer => resBuffer.json())
      .then((res) => {
        this.setState({
          events: res.events,
          loading: false,
          hasMoreItems: res.pagination.has_more_items,
          currentPage: res.pagination.page_number,
        });
      });
  }

  resetEventsList() {
    const { events } = this.state;
    if (events.length > 1) {
      this.setState({
        events: [],
        searchedForValue: null,
      });
    }
  }

  fetchMoreItems() {
    const { hasMoreItems } = this.state;
    let { currentPage } = this.state;
    if (hasMoreItems) {
      this.setState({
        currentPage: currentPage += 1,
        loading: true,
      });
      return fetch(
        `https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX&page=${
          currentPage
        }`,
      )
        .then(handleErrors)
        .then(resBuffer => resBuffer.json())
        .then((res) => {
          this.setState(prevState => ({
            events: prevState.events.concat(res.events),
            loading: false,
            hasMoreItems: res.pagination.has_more_items,
            currentPage: res.pagination.page_number,
          }));
        });
    }
  }

  changeHandler(event) {
    this.setState({
      inputValue: event.nativeEvent.text,
    });
  }

  searchEvents() {
    const { inputValue, currentPage } = this.state;
    this.setState({
      loading: true,
      currentPage: 1,
      searchedForValue: inputValue,
      activeSearch: true,
    });
    return fetch(
      `https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX&q=${
        inputValue
      }&page=${currentPage}`,
    )
      .then(handleErrors)
      .then(resBuffer => resBuffer.json())
      .then((res) => {
        this.setState({
          events: res.events,
          loading: false,
          hasMoreItems: res.pagination.has_more_items,
          currentPage: res.pagination.page_number,
        });
      });
  }

  fetchMoreSearchedItems() {
    let { currentPage } = this.state;
    const { inputValue } = this.state;
    this.setState({
      loading: true,
      currentPage: currentPage += 1,
    });
    return fetch(
      `https://www.eventbriteapi.com/v3/events/search/?token=VBUSKKCQ2VTXKPOP34PX&q=${inputValue}&page=${currentPage}`,
    )
      .then(handleErrors)
      .then(resBuffer => resBuffer.json())
      .then((res) => {
        this.setState(prevState => ({
          events: prevState.events.concat(res.events),
          loading: false,
          hasMoreItems: res.pagination.has_more_items,
          currentPage: res.pagination.page_number,
        }));
      });
  }

  render() {
    const {
      loading, inputValue, searchedForValue, events, hasMoreItems, activeSearch,
    } = this.state;
    return (
      <View style={styles.container}>
        {loading && <Loading />}
        <ScrollView>
          <Text style={styles.heading} onPress={this.getEvents}>
            Eventually
          </Text>
          <Text style={styles.subHeading}>events listing search</Text>
          <FormLabel>Search</FormLabel>
          <FormInput style={styles.formInput} onChange={this.changeHandler} />
          <Button
            style={styles.searchButton}
            onPress={this.searchEvents}
            title="SEARCH"
            color={loading ? 'red' : '#BADA55'}
            accessibilityLabel="Search for events"
            value={inputValue}
          />
          {searchedForValue && (
            <Text style={styles.postSearchMessage}>
              You searched for:
              <Text style={styles.searchedForValue}>
                {searchedForValue}
              </Text>
            </Text>
          )}
          <EventList
            events={events}
            hasMoreItems={hasMoreItems}
            fetchMoreItems={this.fetchMoreItems}
            loading={loading}
            fetchMoreSearchedItems={this.fetchMoreSearchedItems}
            activeSearch={activeSearch}
            searchedForValue={searchedForValue}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6defc',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingLeft: 8,
  },
  searchedForValue: {
    color: '#d82aff',
  },
});
