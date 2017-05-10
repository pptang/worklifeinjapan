import React, { Component, PropTypes } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button, Item, Input } from 'native-base';


export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
    };
  }

  render() {
    return (
      <Header style={{ backgroundColor: '#fff', width: '100%', position: 'relative' }}>
        <Left>
          {
            this.props.goBack ?
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: '#b51d22' }} />
              </Button>
              :
              <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Icon name="menu" style={{ color: '#b51d22' }} />
              </Button>
          }
        </Left>
        <Body style={{ position: 'absolute', left: '15%', width: '70%' }}>
          {
          this.state.isSearching ?
            <Item rounded>
              <Input placeholder="搜尋文章" />
            </Item>
            :
            <Title style={{ color: '#b51d22', width: '100%', justifyContent: 'center', alignItems: 'center' }}>{this.props.title}</Title>
        }

        </Body>
        <Right style={{ width: '15%', position: 'absolute', right: 15 }} >
          <Button transparent onPress={() => this.setState({ isSearching: true })}>
            <Icon name="search" style={{ color: '#b51d22' }} />
          </Button>
        </Right>
      </Header>
    );
  }

}

Navbar.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
  goBack: PropTypes.bool.isRequired,
};
