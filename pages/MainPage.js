import React, { PropTypes } from 'react';
import { DrawerNavigator, StackNavigator, DrawerView } from 'react-navigation';
import ArticlesPage from './ArticlesPage';
import DetailPage from './DetailPage';
import { Image, View } from 'react-native';

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
  drawerWidth: 200,
  contentOptions: {
    activeTintColor: '#b51d22',
  },
  contentComponent: props => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 30,
      }}
    >
      <Image
        style={{ width: 198, height: 56 }}
        source={require('../img/logo/wij.png')}
      />
      <DrawerView.Items {...props} />
    </View>
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
  const Main = DrawerNavigator(routeConfigs, DrawerNavigatorConfig);
  return (
    <Main />
  );
};

MainPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};
export default MainPage;
