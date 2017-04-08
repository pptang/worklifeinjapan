import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import MainPage from './pages/MainPage';
import ArticleListPage from './pages/ArticleListPage';

const App = DrawerNavigator({
  Main: { screen: MainPage },
  ArticleList: { screen: ArticleListPage },
});

AppRegistry.registerComponent('worklifeinjapan', () => App);
