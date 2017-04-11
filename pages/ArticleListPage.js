import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Text, Button, Card, CardItem } from 'native-base';
import { Image, View } from 'react-native';
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
                    <Image
                      style={{ width: 400, height: 400 }}
                      source={{
                        uri: post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-square']
                          ? post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-square'].source_url
                          : post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-default'].source_url
                      }} />

                  </CardItem>
                  <CardItem content>
                    <Text>
                      {
                        post.my_excerpt
                            .replace(/&nbsp;/g, '')
                            .substr(0, 100)
                      }......
                    </Text>
                  </CardItem>
                  <CardItem footer>
                    <Right>
                      <Button primary bordered rounded onPress={() => this.props.navigation.navigate('ArticleDetailPage', { post })}>
                        <Text>Read More</Text>
                      </Button>
                    </Right>
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
