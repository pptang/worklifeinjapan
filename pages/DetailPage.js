import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Text, Button, Card, CardItem, Thumbnail, H2, Spinner } from 'native-base';
import { Image, View, WebView } from 'react-native';
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
const style = `
  <style>
  body, html, #height-calculator {
      margin: 0;
      padding: 0;
  }
  #height-calculator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
  }
  </style>
`;

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
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
        <NavBar navigation={this.props.navigation} title={this.props.title} goBack={true}/>
        {/*<Header>
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
                    : post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-default'].source_url
                }} />
            </CardItem>
            <CardItem content>
              {/*<Text>
                {
                  post.content.plaintext.replace(/&nbsp;/g, '')
                }
              </Text>*/}
              <WebView
                scrollEnabled={false}
                scalesPageToFit={true}
                source={{ html: `${post.content.rendered}${script}` }}
                style={{ height: this.state.height }}
                javaScriptEnabled ={true}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
