import React, { Component } from 'react';
import MainPage from './MainPage';
import { CATEGORY_LIST } from '../utils/constants';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    fetch(CATEGORY_LIST)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          categories: res,
        });
      })
      .catch(err => console.error(err));
  }
  render() {
    if (this.state.categories.length) {
      return (
        <MainPage categories={this.state.categories} />
      );
    }
    return null; // TODO: Splash Screen
  }
}

