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
        style={{ zIndex: -1, position: 'absolute', top: -250, left: 0, bottom: 0, right: 0 }}
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
