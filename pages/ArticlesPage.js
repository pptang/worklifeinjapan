import React, { Component, PropTypes } from 'react';
import { Container, Body, Content, Left, Right, Text, Button, Card, CardItem, Spinner, H3, Thumbnail } from 'native-base';
import { View } from 'react-native';
import Moment from 'moment';
import NavBar from '../components/NavBar';
import ErrorBar from '../components/ErrorBar';
import { ARTICLE_LIST } from '../utils/constants';
import lang from '../i18n/zh-tw';
import Firestack from 'react-native-firestack';

export default class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.state = {
      categoryId: null,
      posts: [],
      hasMoreArticles: true,
      isShowingError: false,
    };
  }
  componentDidMount() {
    this.isLoading = true;
    this.page = 1;
    this.fetchArticles(this.props.navigation.state.params.categoryId);
  }
  // componentWillReceiveProps(props) {
  //   this.fetchArticles(props.navigation.state.params.categoryId);
  // }
  fetchArticles(categoryId) {
    if (this.totalPages && this.page < this.totalPages) {
      this.page = this.page + 1;
    } else if (this.page === this.totalPages) {
      this.setState({ hasMoreArticles: false });
      alert('No more articles');
      return;
    }
    const url = categoryId ?
      `${ARTICLE_LIST}&categories=${categoryId}&page=${this.page}`
      :
      `${ARTICLE_LIST}&page=${this.page}`;
    fetch(url)
      .then((res) => {
        this.totalPages = res.headers.map['x-wp-totalpages'] ?
          Number(res.headers.map['x-wp-totalpages'][0])
          : 0;
        return res.json();
      })
      .then((res) => {
        this.isLoading = false;
        this.setState(prevState => ({
          posts: [...prevState.posts, ...res],
        }));

        const firestack = new Firestack();
        firestack.analytics.logEventWithName('page_article', { category: this.props.navigation.state.params.title });
      })
      .catch(() => this.setState({ isShowingError: true }));
  }

  render() {
    const closeErrorBar = () => {
      this.setState({ isShowingError: false });
    };
    return (
      <Container>
        <NavBar navigation={this.props.navigation} title={this.props.navigation.state.params.title} goBack={false} />
        {
          this.state.isShowingError && <ErrorBar close={closeErrorBar} />
        }
        {/* <Header style={{ backgroundColor: '#fff' }}>
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
        <Content
          onScroll={(event) => {
            if (!this.isLoading && event.nativeEvent.contentOffset.y + 650 > this.spinnerOffsetTop) {
              const categoryId = this.props.navigation.state.params.categoryId;
              this.fetchArticles(categoryId);
              this.isLoading = true;
            }
          }}
        >
          {
            this.state.posts.length > 0 ?
              this.state.posts.map(post => (
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
                      size={150}
                      square
                      source={post.featured_media ?
                      {
                        uri: post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url,

                      }
                        : require('../img/logo/work-in-japan.png')
                      }
                    />
                  </CardItem>
                  {/* <CardItem cardBody>
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
              ))
              :
              <Spinner color="red" />
          }
          {
            this.state.hasMoreArticles && this.state.posts.length > 0 ?
              <View
                ref={(ref) => { this.view = ref; }}
                onLayout={({ nativeEvent }) => {
                  this.spinnerOffsetTop = nativeEvent.layout.y;
                }}
              >
                <Spinner color="red" />
              </View>
              :
              null
          }

        </Content>
      </Container>
    );
  }
}

ArticlesPage.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string,
        categoryId: PropTypes.number,
      }),
    }).isRequired,
  }).isRequired,
};
