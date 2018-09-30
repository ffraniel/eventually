import React, { Component }from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Loading extends Component {
  render() {
    return(
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>LOADING</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingView: {
    backgroundColor: 'navy',
  },
  loadingText: {
    fontSize:18,
    color: 'white',
  }
})


export default Loading;