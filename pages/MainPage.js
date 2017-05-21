import React, { PropTypes } from 'react';
import { DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation';
import { Container, Content } from 'native-base';
import { Image } from 'react-native';
import ArticlesPage from './ArticlesPage';
import DetailPage from './DetailPage';
import VideoPage from './VideoPage';
import AboutPage from './AboutPage';
import lang from '../i18n/zh-tw';

function getArticlesPageByCategoryId(categoryId, title, query) {
  return StackNavigator(
    {
      ArticlesPage: { screen: ArticlesPage },
      DetailPage: { screen: DetailPage },
      SearchPage: { screen: ArticlesPage },
    }, {
      headerMode: 'none',
      initialRouteName: 'ArticlesPage',
      initialRouteParams: {
        title,
        categoryId,
        query,
      },
    });
}

const DrawerNavigatorConfig = {
  drawerWidth: 250,
  contentOptions: {
    activeTintColor: '#b51d22',
  },
  contentComponent: props => (
    <Container>
      <Content>
        <Image
          style={{ width: 198, height: 56, marginTop: 20 }}
          source={require('../img/logo/wij.png')}
        />
        <DrawerItems {...props} />
      </Content>
    </Container>
  ),
};

const MainPage = ({ categories }) => {
  const routeConfigs = categories.reduce((result, category) => {
    let title = category.name;
    if (lang[category.slug]) {
      title = lang[category.slug];
    }
    const component = getArticlesPageByCategoryId(category.id, title, '');
    result[title] = { // eslint-disable-line no-param-reassign
      screen: component,
    };
    return result;
  }, {
    最新文章: {
      screen: getArticlesPageByCategoryId(0, '最新文章', ''),
    },
  });
  routeConfigs['Youtube 影片'] = {
    screen: VideoPage,
  };
  routeConfigs['關於我們'] = {
    screen: AboutPage,
  };
  const Main = DrawerNavigator(routeConfigs, DrawerNavigatorConfig);
  return (
    <Main />
  );
};

MainPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};
export default MainPage;
