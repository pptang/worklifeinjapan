import React, { Component, PropTypes } from 'react';
import { Container, Body, Content, Left, Card, CardItem, H2 } from 'native-base';
import { Image, WebView } from 'react-native';
import NavBar from '../components/NavBar';

const script = `
  <script>
    window.location.hash = 1;
    var calculator = document.createElement("div");
    calculator.id = "height-calculator";
    while (document.body.firstChild) {
        calculator.appendChild(document.body.firstChild);
    }
    document.body.appendChild(calculator);
    document.title = calculator.scrollHeight;
  </script>
`;

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  onNavigationStateChange(event) {
    if (event.title) {
      const htmlHeight = Number(event.title); // document.body.clientHeight is stored in document.title
      this.setState({ height: htmlHeight });
    }
  }
  render() {
    const post = this.props.navigation.state.params.post;
    return (
      <Container backgroundColor="white">
        <NavBar navigation={this.props.navigation} title={this.props.title} goBack />
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
                  uri: post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-square']
                    ? post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-square'].source_url
                    : post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-default'].source_url,
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
                source={{ html: `${post.content.rendered}${script}` }}
                style={{ height: this.state.height }}
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
