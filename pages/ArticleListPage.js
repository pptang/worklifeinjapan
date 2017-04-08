import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Text, Button, Card, CardItem } from 'native-base';
import { ARTICLE_LIST } from '../utils/constants';

export default class ArticleListPage extends Component {
  constructor(props) {
    super(props);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.state = {
      posts: []
    };
  }
  componentWillMount() {
    this.fetchArticles();
  }
  fetchArticles() {
    fetch(ARTICLE_LIST)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          posts: res.posts
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
              return (
                <Card key={post.id}>
                  <CardItem>
                    <Body>
                      <Text>{post.title}</Text>
                    </Body>
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
