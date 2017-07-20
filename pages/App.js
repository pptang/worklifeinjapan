import React, { Component } from 'react';
import MainPage from './MainPage';
import ErrorBar from '../components/ErrorBar';
import { CATEGORY_LIST } from '../utils/constants';
import { View, Image, Text } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isShowingError: false,
    };
    this.reload = this.reload.bind(this);
  }
  componentDidMount() {
    this.reload();
  }

  reload() {
    fetch(CATEGORY_LIST)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          categories: res.filter(category => category.count),
          isShowingError: false
        });
      })
      .catch(() => this.setState({ isShowingError: true }));
  }

  render() {
    if (this.state.categories.length) {
      return (
        <MainPage categories={this.state.categories} />
      );
    } else if (this.state.isShowingError) {
      return <ErrorBar close={this.reload} />;
    }

    const splashScreen = (
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require('../img/logo/work-in-japan.png')}
        />
        <Text style={{ fontFamily: 'Cochin', fontSize: 25, fontWeight: 'bold' }}>
          WorkLifeInJapan
        </Text>
      </View>
    );

    return splashScreen;
  }
}
