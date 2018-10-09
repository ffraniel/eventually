import React, { Component } from 'react';
import { WebView, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

class EventWebView extends Component {
  render() {
    const { toggleOpen, descriptionHTML } = this.props;
    return (
      <WebView
        style={toggleOpen ? styles.webView : styles.webViewClosed}
        automaticallyAdjustContentInsets={true}
        source={{ html: descriptionHTML }}
        javaScriptEnabled={true}
        startInLoadingState={true}
        domStorageEnabled={true}
        ref="Event webview"
      />
    );
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
  webViewClosed: {
    height: 0,
  },
});

EventWebView.propTypes = {
  toggleOpen: PropTypes.bool,
  descriptionHTML: PropTypes.string,
};
