import React, { Component } from 'react';
import { WebView, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

class EventWebView extends Component {
  render() {
    const { toggleOpen, descriptionHTML } = this.props;
    const webviewRef = React.createRef();
    return (
      <WebView
        style={toggleOpen ? styles.webView : styles.webViewClosed}
        automaticallyAdjustContentInsets
        source={{ html: descriptionHTML }}
        javaScriptEnabled
        startInLoadingState
        domStorageEnabled
        ref={webviewRef}
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
  toggleOpen: PropTypes.bool.isRequired,
  descriptionHTML: PropTypes.string.isRequired,
};
