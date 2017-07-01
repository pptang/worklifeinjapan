import React, { PropTypes } from 'react';
import { Container } from 'native-base';
import { WebView } from 'react-native';
import NavBar from '../components/NavBar';

export default function DetailPage({ navigation }) {
  const post = navigation.state.params.post;
  const shareContent = {
    title: post.title.rendered,
    message: post.link,
  };
  return (
    <Container backgroundColor="white">
      <NavBar navigation={navigation} title={post.title.rendered} goBack showShare shareContent={shareContent} />
      <WebView
        source={{ uri: post.guid.rendered }}
        injectedJavaScript={'document.querySelector(\'.page_header\').style.display = \'none\';'}
      />
    </Container>
  );
}

DetailPage.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        post: PropTypes.object,
      }),
    }).isRequired,
  }).isRequired,
};
