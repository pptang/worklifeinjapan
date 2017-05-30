import React, { Component, PropTypes } from 'react';
import YouTube from 'react-native-youtube';
import { Container, Content, Card, CardItem, Body, Left, H3, Text } from 'native-base';
import Moment from 'moment';
import NavBar from '../components/NavBar';
import ErrorBar from '../components/ErrorBar';
import { CHANNEL_VIDEO_LIST, YOUTUBE_API_KEY } from '../utils/constants';

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
                      <YouTube
                        apiKey={YOUTUBE_API_KEY}
                        videoId={video.id.videoId}
                        play={this.state.isPlaying}
                        hidden={false}
                        onReady={() => { this.setState({ isReady: true }); }}
                        onChangeState={(e) => { this.setState({ status: e.state }); }}
                        onChangeQuality={(e) => { this.setState({ quality: e.quality }); }}
                        onError={() => { this.setState({ isShowingError: true }); }}
                        style={{ alignSelf: 'stretch', height: 200, backgroundColor: 'black', marginVertical: 20, marginHorizontal: 5 }}
                      />
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
