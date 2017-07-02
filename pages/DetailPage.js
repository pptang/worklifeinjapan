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
        // javaScriptEnabled={false}
        injectedJavaScript={'document.querySelector(\'.page_header\').style.display = \'none\';\
        var layout = document.getElementById(\'layout\');\
        layout.parentNode.removeChild(layout);\
        var signup = document.getElementById(\'mc_embed_signup_scroll\');\
        signup.parentNode.removeChild(signup);\
        var related = document.getElementById(\'wp_related_posts_widget\');\
        related.parentNode.removeChild(related);\
        setTimeout(function() {\
          document.querySelector(\'.sumome-share-client-wrapper\').style.display = \'none\';\
          document.querySelector(\'.sumome-scrollbox-popup\').style.display = \'none\';\
        }, 2000);'}
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
