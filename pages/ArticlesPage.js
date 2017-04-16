import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Text, Button, Card, CardItem, Spinner, H3, Thumbnail } from 'native-base';
import { Image, View } from 'react-native';
import Moment from 'moment';
import NavBar from '../components/NavBar';
import { ARTICLE_LIST } from '../utils/constants';
import lang from '../i18n/zh-tw';

export default class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.state = {
      categoryId: null,
      posts: []
    };
  }
  componentDidMount() {
    this.fetchArticles(this.props.navigation.state.params.categoryId);
  }
  componentWillReceiveProps(props) {
    this.fetchArticles(props.navigation.state.params.categoryId);
  }
  fetchArticles(categoryId) {
    const url = categoryId ?
      `${ARTICLE_LIST}&categories=${categoryId}`
      :
      ARTICLE_LIST;
    console.log(url);
    return fetch(url)
      .then(res => res.json())
      .then((res) => {
        console.log(res[0].id);
        this.setState({
          posts: res
        });
      })
      .catch(err => console.error(err));
  }
  render() {

    return (
      <Container>
        <NavBar navigation={this.props.navigation} title={this.props.navigation.state.params.title} goBack={false}/>
        {/*<Header style={{ backgroundColor: '#fff' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" style={{color: '#b51d22'}} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#b51d22' }}>{lang.new_article_list}</Title>
          </Body>
          <Right />
        </Header>*/}
        <Content>
          {
            this.state.posts.length > 0 ?
              this.state.posts.map((post) => {
                return (
                  <Card key={post.id} style={{ flex: 0 }}>
                    <CardItem header>
                      <Left>
                        <Body>
                          <Text note>{`${Moment(post.date).format('YYYY-MM-DD')} / By ${post._embedded.author[0].name}`}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Body>
                          <H3>{post.title.rendered}</H3>
                        </Body>
                      </Left>
                      <Thumbnail
                        style={{ marginLeft: 10 }}
                        square
                        source={{
                          uri: post._embedded['wp:featuredmedia'][0].media_details.sizes['thumbnail'].source_url
                        }}
                      />
                    </CardItem>
                    {/*<CardItem cardBody>
                      <Image
                        style={{ width: 400, height: 200 }}
                        source={{
                          uri: post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-square']
                            ? post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-square'].source_url
                            : post._embedded['wp:featuredmedia'][0].media_details.sizes['portfolio-default'].source_url
                        }} />
                    </CardItem>*/}
                    <CardItem content>
                      <Left>
                      <Body>
                      <Text>
                        {
                          post.my_excerpt
                              .replace(/&nbsp;/g, '')
                              .substr(0, 100)
                        }......
                      </Text>
                      </Body>
                      </Left>
                    </CardItem>
                    <CardItem footer>
                      <Right>
                        <Button danger bordered rounded onPress={() => this.props.navigation.navigate('DetailPage', { post, title: this.props.navigation.state.params.title })}>
                          <Text>{lang.continue_reading}</Text>
                        </Button>
                      </Right>
                    </CardItem>
                  </Card>
                );
              })
              :
              <Spinner color='red' />
          }
        </Content>
      </Container>
    );
  }
}
