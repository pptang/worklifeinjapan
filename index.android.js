import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import MainPage from './pages/MainPage';

const App = DrawerNavigator({
  Main: { screen: MainPage },
  ArticleList: { screen: ArticleList },
});

AppRegistry.registerComponent('worklifeinjapan', () => App);
