import React, { Component } from 'react';
import MainPage from './MainPage';
import ErrorBar from '../components/ErrorBar';
import { CATEGORY_LIST } from '../utils/constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isShowingError: false,
    };
  }
  componentDidMount() {
    fetch(CATEGORY_LIST)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          categories: res.filter(category => category.count),
        });
      })
      .catch(() => this.setState({ isShowingError: true }));
  }

  render() {
    const closeErrorBar = () => {
      this.setState({ isShowingError: false });
    };

    if (this.state.categories.length) {
      return (
        <MainPage categories={this.state.categories} />
      );
    }
    return this.state.isShowingError && <ErrorBar close={closeErrorBar} />; // TODO: Splash Screen
  }
}
