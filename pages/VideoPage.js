import React, { Component, PropTypes } from 'react';
import { Container, Content, Card, CardItem, Body, Left, H3, Text } from 'native-base';
import Moment from 'moment';
import NavBar from '../components/NavBar';
import ErrorBar from '../components/ErrorBar';
import { CHANNEL_VIDEO_LIST } from '../utils/constants';
import { Image, TouchableHighlight } from 'react-native';

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
    };
  }

  componentDidMount() {
    fetch(CHANNEL_VIDEO_LIST)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        if (res.items) {
          this.setState({
            videos: res.items,
          });
        }
      })
      .catch(() => this.setState({ isShowingError: true }));
  }

  render() {
    const closeErrorBar = () => {
      this.setState({ isShowingError: false });
    };
    return (
      <Container>
        <NavBar navigation={this.props.navigation} title="Youtube 影片" goBack={false} />
        {
          this.state.isShowingError && <ErrorBar close={closeErrorBar} />
        }
        <Content>
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
                        <H3>{video.snippet.title}</H3>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem content>
                    <Body>
                      <TouchableHighlight
                        onPress={() => {
                          console.log(this.props.navigation);
                          this.props.navigation.navigate('VideoDetailPage', { video });
                        }}
                      >
                        <Image
                          style={{ width: '100%', height: 200 }}
                          source={{ uri: video.snippet.thumbnails.high.url ? video.snippet.thumbnails.high.url : video.snippet.thumbnails.default.url }}
                        />
                      </TouchableHighlight>
                    </Body>
                  </CardItem>
                </Card>
              ))
              : null // TODO: should add splash screen
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
