import React, { PropTypes } from 'react';
import { DrawerNavigator, StackNavigator, DrawerView } from 'react-navigation';
import { Container, Content } from 'native-base';
import { Image } from 'react-native';
import ArticlesPage from './ArticlesPage';
import DetailPage from './DetailPage';
import VideoPage from './VideoPage';

function getArticlesPageByCategoryId(categoryId, title) {
  return StackNavigator(
    {
      ArticlesPage: { screen: ArticlesPage },
      DetailPage: { screen: DetailPage },
    }, {
      headerMode: 'none',
      initialRouteName: 'ArticlesPage',
      initialRouteParams: {
        title,
        categoryId,
      },
    });
}

const DrawerNavigatorConfig = {
  drawerWidth: 300,
  contentOptions: {
    activeTintColor: '#b51d22',
  },
  contentComponent: props => (
    <Container
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 30,
      }}
    >
      <Content>
        <Image
          style={{ width: 198, height: 56 }}
          source={require('../img/logo/wij.png')}
        />
        <DrawerView.Items {...props} />
      </Content>
    </Container>
  ),
};

const MainPage = ({ categories }) => {
  const routeConfigs = categories.reduce((result, category) => {
    const component = getArticlesPageByCategoryId(category.id, category.slug);
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
