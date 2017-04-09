import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Text, Button, Card, CardItem, Thumbnail } from 'native-base';
import { ARTICLE_LIST } from '../utils/constants';

export default class ArticleListPage extends Component {
  constructor(props) {
    super(props);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.fetchArticles();
  }
  fetchArticles() {
    return fetch(ARTICLE_LIST)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          posts: res
        });
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ArticleList</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {
            this.state.posts.map((post) => {
              console.error(post);
              return (
                <Card key={post.id} style={{ flex: 0 }}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>{post.title.rendered}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Thumbnail style={{ resizeMode: 'cover' }} square source={{ uri: post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url }} />
                  </CardItem>
                  <CardItem content>
                    <Text>{post.my_excerpt}</Text>
                  </CardItem>
                </Card>
              );
            })
          }
        </Content>
      </Container>
    );
  }
}
