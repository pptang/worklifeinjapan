import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { WebView } from 'react-native-webview';
import NavBar from '../components/NavBar';
import Spinner from 'react-native-loading-spinner-overlay';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false,
      isFirstLoad: true,
    };
  }
  render() {
    const post = this.props.navigation.state.params.post;
    const shareContent = {
      title: post.title.rendered,
      message: post.link,
    };
    return (
      <Container backgroundColor="white">
        <NavBar navigation={this.props.navigation} title={post.title.rendered} goBack showShare shareContent={shareContent} />
        <WebView
          source={{ uri: post.guid.rendered }}
          injectedJavaScript={`
          document.querySelector('.page_header').style.display = 'none';
          document.querySelector('.column2').style.display = 'none';
          document.querySelector('#disqus_thread').style.display = 'none';
          setTimeout(function() {
            document.querySelector('.sumome-share-client-wrapper').style.display = 'none';
          }, 1000);
          document.querySelector('.single_tags').style.display = 'none';
          document.querySelector('.sumome-share-client-wrapper').style.display = 'none';
        `}
          onLoadStart={() => {
            if (this.state.isFirstLoad) {
              this.setState({ showSpinner: true, isFirstLoad: false });
            }
          }}
          onLoadEnd={() => setTimeout(() => this.setState({ showSpinner: false }), 500)}
        />
        {
          this.state.showSpinner ? <Spinner visible={this.state.showSpinner} overlayColor={'rgba(255, 255, 255, 1)'} textContent={'讀取文章中...'} textStyle={{ color: '#b51d22' }} color="#b51d22" /> : null
        }
      </Container>
    );
  }

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
