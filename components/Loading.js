import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

class Loading extends Component {
  render() {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>LOADING</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingView: {
    zIndex: 2,
    backgroundColor: "rgba(120, 120, 120, 0.9)",
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
