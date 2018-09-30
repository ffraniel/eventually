import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Loading from './components/Loading';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listings: [],
      filters: []
    };
    this.testMethod = this.testMethod.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);
  }

  componentDidMount(){
    this.testMethod();
    this.getAllEvents();
  }

  testMethod () {
    setTimeout(()=>{
      this.setState({
        loading: false
      })
    }, 1000)
  }
  getAllEvents(){
    console.log("get all events called")
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <Loading />}
        {!this.state.loading && (
          <ScrollView>
            <Text style={styles.heading}>Eventually</Text>
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
    fontSize: 20,
  },
});
