import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Body, Content, Left, Right, Text, Button, Card, CardItem, Spinner, H3, Thumbnail } from 'native-base';
import { View, WebView } from 'react-native';
import Moment from 'moment';
import NavBar from '../components/NavBar';
import ErrorBar from '../components/ErrorBar';
import { ARTICLE_LIST } from '../utils/constants';
import lang from '../i18n/zh-tw';

export default class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.state = {
      categoryId: null,
      posts: [],
      hasMoreArticles: true,
      isShowingError: false,
      hasSearchResult: true,
    };
    this.reload = this.reload.bind(this);
  }
  componentDidMount() {
    this.reload();
  }
  // componentWillReceiveProps(props) {
  //   this.fetchArticles(props.navigation.state.params.categoryId);
  // }

  reload() {
    this.isLoading = true;
    this.page = 1;
    this.fetchArticles(this.props.navigation.state.params.categoryId, this.props.navigation.state.params.query);
  }

  fetchArticles(categoryId, query) {
    if (this.totalPages && this.page < this.totalPages) {
      this.page = this.page + 1;
    } else if (this.page === this.totalPages) {
      this.setState({ hasMoreArticles: false });
      return;
    }

    let queryString = '';
    if (query) {
      queryString = queryString.concat(`&search=${query}`);
    } else if (categoryId) {
      queryString = queryString.concat(`&categories=${categoryId}`);
    }
    const url = `${ARTICLE_LIST}${queryString}&page=${this.page}`;

    fetch(url)
      .then((res) => {
        this.totalPages = res.headers.map['x-wp-totalpages'] ?
          Number(res.headers.map['x-wp-totalpages'][0])
          : 0;
        return res.json();
      })
      .then((res) => {
        this.isLoading = false;
        if (res.length > 0) {
          this.setState(prevState => ({
            posts: [...prevState.posts, ...res],
            isShowingError: false,
          }));
        } else {
          this.setState({
            hasMoreArticles: false,
            hasSearchResult: false,
            isShowingError: false,
          });
        }
      })
      .catch(() => {
        this.setState({ isShowingError: true });
      });
  }

  render() {
    return (
      <Container>
        <NavBar navigation={this.props.navigation} title={this.props.navigation.state.params.title} goBack={!!this.props.navigation.state.params.query} />
        {
          this.state.isShowingError && <ErrorBar close={this.reload} />
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
        </Header> */}
        <Content
          onScroll={(event) => {
            if (!this.isLoading && event.nativeEvent.contentOffset.y + 650 > this.spinnerOffsetTop) {
              const categoryId = this.props.navigation.state.params.categoryId;
              const query = this.props.navigation.state.params.query;
              this.fetchArticles(categoryId, query);
              this.isLoading = true;
            }
          }}
        >
          {this.state.hasSearchResult ?
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
                  </CardItem> */}
                <CardItem content>
                  <Left>
                    <Body>
                      <WebView source={{ html: post.excerpt.rendered }} style={{ height: 75 }} scrollEnabled={false} />
                    </Body>
                  </Left>
                </CardItem>
                <CardItem footer>
                  <Right>
                    <Button danger bordered rounded onPress={() => this.props.navigation.navigate('DetailPage', { post })}>
                      <Text>{lang.continue_reading}</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            ))
            :
            <Card transparent key="no-result" style={{ flex: 0 }}>
              <CardItem content>
                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text>
                    搜尋不到結果
                    </Text>
                </Body>
              </CardItem>
            </Card>
          }
          {
            !this.state.isShowingError && this.state.hasMoreArticles && this.state.posts.length >= 0 ?
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
        query: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired,
};
