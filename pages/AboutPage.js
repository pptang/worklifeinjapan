import React, { PropTypes } from 'react';
import { Container } from 'native-base';
import { WebView } from 'react-native';
import NavBar from '../components/NavBar';

export default function AboutPage({ navigation }) {
  return (
    <Container backgroundColor="white">
      <NavBar navigation={navigation} title="關於我們" />
      <WebView
        source={{ uri: 'http://www.worklifeinjapan.net/home/about-us' }}
        injectedJavaScript={'document.querySelector(\'.page_header\').style.display = \'none\';'}
        startInLoadingState
      />
    </Container>
  );
}

AboutPage.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        post: PropTypes.object,
      }),
    }).isRequired,
  }).isRequired,
};
