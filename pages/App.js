import React, { Component } from 'react';
import MainPage from './MainPage';
import ErrorBar from '../components/ErrorBar';
import { CATEGORY_LIST } from '../utils/constants';
import Firestack from 'react-native-firestack';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isShowingError: false,
    };
  }

  componentWillMount() {
    const firestack = new Firestack();
    firestack.analytics.logEventWithName("launch", {
      'screen': 'Main screen'
    })
    // .then(res => console.log('Sent event named launch'))
    // .catch(err => console.error('You should never end up here'));
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
