/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator, DrawerView } from 'react-navigation';
import { AppRegistry } from 'react-native';
import MainPage from './pages/MainPage';
import ArticlesPage from './pages/ArticlesPage';
import DetailPage from './pages/DetailPage';
import { View, Image } from 'react-native';
import { Content } from 'native-base';
import lang from './i18n/zh-tw';

const LatestArticlesPage = StackNavigator({
  ArticlesPage: { screen: ArticlesPage },
  DetailPage: { screen: DetailPage }
}, {
  headerMode: 'none',
  initialRouteName: 'ArticlesPage',
  initialRouteParams: {
    categoryId: 193
  }
});

const DrawerNavigatorConfig = {
  drawerWidth: 200,
  contentOptions: {
    activeTintColor: '#b51d22'
  },
  contentComponent: (props) => {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        padding: 30
      }}>
        <Image
          style={{ width: 198, height: 56 }}
          source={require('./img/logo/wij.png')}
        />
        <DrawerView.Items {...props} />
      </View>
    )
  }
}

const App = DrawerNavigator({
  [lang.new_article_list]: { screen: LatestArticlesPage },
}, DrawerNavigatorConfig);

AppRegistry.registerComponent('worklifeinjapan', () => App);
