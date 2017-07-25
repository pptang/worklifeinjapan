import React, { Component, PropTypes } from 'react';
import { Container, Content, Card, CardItem, Body, Left, H3, Text, Icon, Button, Spinner, Header } from 'native-base';
import Moment from 'moment';
import NavBar from '../components/NavBar';
import ErrorBar from '../components/ErrorBar';
import { CHANNEL_VIDEO_LIST } from '../utils/constants';
import { Image, TouchableWithoutFeedback, Modal, WebView, View } from 'react-native';

export default class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: false,
      isShowingError: false,
      modalVisible: false,
      focusVideo: null,
      hasMoreVideos: true,
      pageToken: '',
    };
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  fetchVideos() {
    this.isLoading = true;
    const url = `${CHANNEL_VIDEO_LIST}&pageToken=${this.state.pageToken}`;
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        this.isLoading = false;
        if (res.items) {
          this.setState({
            videos: res.items,
            hasMoreVideos: !!res.nextPageToken,
            pageToken: res.nextPageToken ? res.nextPageToken : '',
            isShowingError: false,
          });
        }
      })
      .catch(() => {
        this.setState({ isShowingError: true });
      });
  }

  reload() {
    this.isLoading = true;
    this.fetchVideos();
  }

  render() {
    return (
      <Container>
        <NavBar navigation={this.props.navigation} title="Youtube 影片" goBack={false} />
        {
          this.state.isShowingError && <ErrorBar close={this.reload} />
        }
        {this.state.focusVideo != null ? <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({ modalVisible: false }); }}
        >
          <Header style={{ backgroundColor: '#fff' }} androidStatusBarColor="#b51d22">
            <Left style={{ flex: 1 }}>
              <Button transparent onPress={() => this.setState({ modalVisible: false })}>
                <Icon name="arrow-back" style={{ color: '#b51d22' }} />
              </Button>
            </Left>
          </Header>
          <WebView
            style={{ flex: 1 }}
            javaScriptEnabled
            source={{ uri: `https://www.youtube.com/embed/${this.state.focusVideo.id.videoId}?rel=0&autoplay=0&showinfo=0&controls=1` }}
          />

        </Modal> : null}
        <Content
          onScroll={(event) => {
            if (this.state.hasMoreVideos && !this.isLoading && event.nativeEvent.contentOffset.y + 650 > this.spinnerOffsetTop) {
              this.fetchVideos();
            }
          }}
        >
          {
            this.state.videos.length ?
              this.state.videos.map(video => (
                <Card key={video.id.videoId || video.id.channelId} style={{ flex: 0 }}>
                  <CardItem header>
                    <Left>
                      <Body>
                        <Text note>{`Published at ${Moment(video.snippet.publishedAt).format('YYYY-MM-DD')}`}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Body>
                        <TouchableWithoutFeedback
                          onPress={() => this.setState({ modalVisible: true, focusVideo: video })}
                        >
                          <H3>{video.snippet.title}</H3>
                        </TouchableWithoutFeedback>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem content>
                    <Body>
                      <TouchableWithoutFeedback
                        onPress={() => this.setState({ modalVisible: true, focusVideo: video })}
                      >
                        <Image
                          style={{ width: '100%', height: 200 }}
                          source={{ uri: video.snippet.thumbnails.high.url ? video.snippet.thumbnails.high.url : video.snippet.thumbnails.default.url }}
                        />
                      </TouchableWithoutFeedback>
                    </Body>
                  </CardItem>
                </Card>
              ))
              : null // TODO: should add splash screen
          }
          {
            !this.state.isShowingError && this.state.hasMoreVideos && this.state.videos.length >= 0 ?
              <View
                ref={(ref) => { this.view = ref; }}
                onLayout={({ nativeEvent }) => {
                  this.spinnerOffsetTop = nativeEvent.layout.y;
                }}
              >
                <Spinner color="red" />
              </View>
              :
              null
          }
        </Content>
      </Container>
    );
  }
}

VideoPage.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
