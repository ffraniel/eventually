import React, { Component } from 'react';
import { WebView, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

class EventWebView extends Component {

  render(){
    return (
      <WebView style={this.props.toggleOpen ? styles.webView : styles.webViewClosed} 
      automaticallyAdjustContentInsets={true}
      source={{ html: this.props.descriptionHTML }} 
      javaScriptEnabled={true}
      startInLoadingState={true}
      domStorageEnabled={true}
      ref={'Event webview'} 
       />
    )
  }
}

export default EventWebView;

const styles = StyleSheet.create({
  webView: {
    zIndex: 2,
    height: Dimensions.get('window').height,
    width: '100%',
    backgroundColor: '#f6defc',
  },
  webViewClosed:{
    height: 0,
  },
});

EventWebView.propTypes = {
  dogs: PropTypes.number,
};