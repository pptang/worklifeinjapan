import React, { Component, PropTypes } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button, Item, Input } from 'native-base';
import { Share } from 'react-native';
import { SHARE_CANCELL, SHARE_SUCCESS, SHARE_FAIL } from '../utils/constants';


export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this._shareText = this._shareText.bind(this);
    // this._showResult = this._showResult.bind(this);
    this.state = {
      isSearching: false,
      searchText: '',
      result: '',
    };
  }

  _shareText() {
    const { message, title } = this.props.shareContent;
    Share.share({
      title,
      message,
    }, {
      dialogTitle: 'Work Life in Japan',
      tintColor: 'green',
    })
      .then(this._showResult)
      // .catch((error) => this.setState({result: 'error: ' + error.message}));
      .catch(() => alert(SHARE_FAIL));
  }
  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        alert(SHARE_SUCCESS);
        this.setState({ result: `shared with an activityType: ${result.activityType}` });
      } else {
        // alert(SHARE_SUCCESS + 'test');
        this.setState({ result: 'shared' });
      }
    } else if (result.action === Share.dismissedAction) {
      alert(SHARE_CANCELL);
      this.setState({ result: 'dismissed' });
    }
  }

  render() {
    const { navigation, title, goBack, showShare } = this.props;
    return (
      <Header style={{ backgroundColor: '#fff', width: '100%', position: 'relative' }}>
        <Left>
          {
            goBack ?
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: '#b51d22' }} />
              </Button>
              :
              <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
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
                  navigation.navigate('SearchPage', { title: this.state.searchText, categoryId: 0, query: this.state.searchText });
                }}
              />
            </Item>
            :
            <Title style={{ color: '#b51d22', width: '100%', justifyContent: 'center', alignItems: 'center' }}>{title}</Title>
        }

        </Body>
        <Right style={{ width: '15%', position: 'absolute', right: 15 }} >
          {
          showShare ?
            <Button transparent onPress={this._shareText}>
              <Icon name="share" style={{ color: '#b51d22' }} />
            </Button>
            : <Button transparent onPress={() => this.setState({ isSearching: true })}>
              <Icon name="search" style={{ color: '#b51d22' }} />
            </Button>
        }

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
  showShare: PropTypes.bool.isRequired,
  shareContent: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

Navbar.defaultProps = {
  title: 'Work Life in Japan',
  goBack: false,
  showShare: false,
  shareContent: {
    title: 'work life in japan',
    message: '',
  },
};
