import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import MainPage from './pages/MainPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticleDetailPage from './pages/ArticleDetailPage';

const ArticlePage= StackNavigator({
  ArticleListPage: { screen: ArticleListPage },
  ArticleDetailPage: { screen: ArticleDetailPage }
}, { headerMode: 'none' });

const App = DrawerNavigator({
  Main: { screen: MainPage },
  ArticlePage: { screen: ArticlePage }
});

AppRegistry.registerComponent('worklifeinjapan', () => App);
