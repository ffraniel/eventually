import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

class Loading extends Component {
  render() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color="white"/>
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingView: {
    zIndex: 2,
    backgroundColor: "rgba(125, 10, 125, 0.8)",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    fontSize: 20,
    color: "white"
  }
});

export default Loading;
