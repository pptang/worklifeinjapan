import React, { Component, PropTypes } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button, Item, Input } from 'native-base';


export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchText: '',
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
        <Body style={{ position: 'absolute', left: '15%', width: '75%' }}>
          {
          this.state.isSearching ?
            <Item rounded>
              <Input
                autoFocus placeholder="搜尋文章"
                onChangeText={searchText => this.setState({ searchText })}
                value={this.state.searchText}
                onBlur={() => {
                  this.setState({ isSearching: false });
                }}
                onSubmitEditing={() => {
                  this.setState({ isSearching: false, searchText: '' });
                  this.props.navigation.navigate('SearchPage', { title: this.state.searchText, categoryId: 0, query: this.state.searchText });
                }}
              />
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
