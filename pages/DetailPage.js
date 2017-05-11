import React, { Component, PropTypes } from 'react';
import { Container, Body, Content, Left, Card, CardItem, H2 } from 'native-base';
import { Image, WebView } from 'react-native';
import NavBar from '../components/NavBar';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  onNavigationStateChange(event) {
    if (event.jsEvaluationValue) {
      const htmlHeight = Number(event.jsEvaluationValue);
      this.setState({ height: htmlHeight });
    }
  }
  render() {
    const post = this.props.navigation.state.params.post;
    const imageBanner = post._embedded['wp:featuredmedia'][0].media_details;
    const html = `<!DOCTYPE html><html><body>${post.content.rendered}<script>window.location.hash = 1;document.title = document.height;</script></body></html>`;
    const shareContent = {
      title: post.title.rendered,
      message: post.link,
    };
    return (
      <Container backgroundColor="white">
        <NavBar navigation={this.props.navigation} title={this.props.title} goBack showShare shareContent={shareContent} />
        {/* <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ArticleDetail</Title>
          </Body>
          <Right />
        </Header>*/}
        <Content>
          <Card key={post.id} style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Body>
                  <H2>{post.title.rendered}</H2>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                style={{ width: 400, height: 200 }}
                source={{
                  uri: imageBanner.sizes['portfolio-default']
                    ? imageBanner.sizes['portfolio-default'].source_url
                    : imageBanner.source_url,
                }}
              />
            </CardItem>
            <CardItem content>
              {/* <Text>
                {
                  post.content.plaintext.replace(/&nbsp;/g, '')
                }
              </Text>*/}
              <WebView
                scrollEnabled={false}
                scalesPageToFit
                source={{ html }}
                style={{ height: this.state.height }}
                injectedJavaScript="document.body.scrollHeight;"
                javaScriptEnabled
                onNavigationStateChange={this.onNavigationStateChange}
              />
            </CardItem>
          </Card>
        </Content>
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
  title: PropTypes.string.isRequired,
};

DetailPage.defaultProps = {
  title: 'WIJ',
};
