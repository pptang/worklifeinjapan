import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Text, Button, Card, CardItem, Thumbnail } from 'native-base';

export default class ArticleDetailPage extends Component {
  render() {
    const post = this.props.navigation.state.params.post;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ArticleDetail</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card key={post.id} style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{post.title.rendered}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Thumbnail style={{ resizeMode: 'cover' }} square source={{ uri: post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url }} />
            </CardItem>
            <CardItem content>
              <Text>
                {
                  post.my_excerpt
                      .replace(/&nbsp;/g, '')
                      .substr(0, 100)
                }......
                {/*<Button buttonText="Read More" />*/}
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
