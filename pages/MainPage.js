import React, { PropTypes } from 'react';
import { DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation';
import { Container, Content } from 'native-base';
import { Image } from 'react-native';
import ArticlesPage from './ArticlesPage';
import DetailPage from './DetailPage';
import VideoPage from './VideoPage';

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
    const component = getArticlesPageByCategoryId(category.id, category.slug, '');
    result[category.slug] = { // eslint-disable-line no-param-reassign
      screen: component,
    };
    return result;
  }, {});
  routeConfigs['Youtube Video'] = {
    screen: VideoPage,
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
