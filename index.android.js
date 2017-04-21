import React from 'react';
import { DrawerNavigator, StackNavigator, DrawerView } from 'react-navigation';
import { AppRegistry, View, Image } from 'react-native';
import ArticlesPage from './pages/ArticlesPage';
import DetailPage from './pages/DetailPage';
import lang from './i18n/zh-tw';

function getArticlesPageByCategoryId(categoryId, title) {
  return StackNavigator({
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
        source={require('./img/logo/wij.png')}
      />
      <DrawerView.Items {...props} />
    </View>
    ),
};

const App = DrawerNavigator({
  [lang.new_article_list]: { screen: getArticlesPageByCategoryId(null, lang.new_article_list) },
  [lang.business_venture_article_list]: { screen: getArticlesPageByCategoryId(169, lang.business_venture_article_list) }, // TODO: Don't hardcode categoryId here
  [lang.find_your_way_article_list]: { screen: getArticlesPageByCategoryId(3, lang.find_your_way_article_list) }, // TODO: Don't hardcode categoryId here
  [lang.english_article_list]: { screen: getArticlesPageByCategoryId(193, lang.english_article_list) }, // TODO: Don't hardcode categoryId here
  [lang.japanese_article_list]: { screen: getArticlesPageByCategoryId(171, lang.japanese_article_list) }, // TODO: Don't hardcode categoryId here
  [lang.japan_insight_article_list]: { screen: getArticlesPageByCategoryId(4, lang.japan_insight_article_list) }, // TODO: Don't hardcode categoryId here
  [lang.japan_life_article_list]: { screen: getArticlesPageByCategoryId(173, lang.japan_life_article_list) }, // TODO: Don't hardcode categoryId here
  [lang.share_story_article_list]: { screen: getArticlesPageByCategoryId(6, lang.share_story_article_list) }, // TODO: Don't hardcode categoryId here
  [lang.wij_member_article_list]: { screen: getArticlesPageByCategoryId(172, lang.wij_member_article_list) }, // TODO: Don't hardcode categoryId here
  [lang.uncategorized_article_list]: { screen: getArticlesPageByCategoryId(1, lang.uncategorized_article_list) }, //TODO: Don't hardcode categoryId here
}, DrawerNavigatorConfig);


AppRegistry.registerComponent('worklifeinjapan', () => App);
