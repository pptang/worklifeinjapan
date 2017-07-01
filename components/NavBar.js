import React, { Component, PropTypes } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button } from 'native-base';
import { Share, TextInput, Platform } from 'react-native';
import { SHARE_CANCELL, SHARE_SUCCESS, SHARE_FAIL, GET_POST } from '../utils/constants';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this._shareText = this._shareText.bind(this);
    this._showResult = this._showResult.bind(this);
    this.state = {
      isSearching: false,
      searchText: '',
      result: '',
      isShowingError: false,
      isHandlingPushNotification: false,
    };
    this.handlePushNotification.bind(this);
  }

  componentDidMount() {
    this.handlePushNotification();
  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
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
        this.setState({ result: 'shared' });
      }
    } else if (result.action === Share.dismissedAction) {
      alert(SHARE_CANCELL);
      this.setState({ result: 'dismissed' });
    }
  }

  handlePushNotification() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then((token) => {
      console.log('token:', token);
      // store fcm token in your server
    });
    FCM.subscribeToTopic('new-article');
    FCM.subscribeToTopic('new-video');
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      // console.log('notif::', notif);
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      // if (notif.local_notification) {
      //   // this is a local notification
      //   console.log('local_notification::', notif);
      // }
      if (notif.opened_from_tray) {
        this.setState({ isHandlingPushNotification: true });
        // app is open/resumed because user clicked banner
        const url = `${GET_POST}${notif.article_id}?_embed=true`;
        fetch(url)
          .then(res => res.json())
          .then((res) => {
            this.setState({ isHandlingPushNotification: false });
            this.props.navigation.navigate('DetailPage', { post: res });
          })
          .catch(() => this.setState({ isShowingError: true, isHandlingPushNotification: false }));
      }
      // await someAsyncCall();

      if (Platform.OS === 'ios') {
        // optional
        // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
        // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        // notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData); // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All); // other types available: WillPresentNotificationResult.None
            break;
          default:
            break;
        }
      }
    });
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log('refresh::', token);
      // fcm token may not be available on first load, catch it here
      if (token) {
        FCM.subscribeToTopic('new-article');
        FCM.subscribeToTopic('new-video');
      }
    });
  }

  render() {
    const { navigation, title, goBack, showShare } = this.props;
    return (
      <Header style={{ backgroundColor: '#fff' }} androidStatusBarColor="#b51d22">
        <Left style={{ flex: 1 }}>
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
        <Body style={{ flex: 4 }}>
          {
            this.state.isSearching ?
              <TextInput
                style={{ height: '100%', width: '100%' }}
                autoFocus placeholder="搜尋文章"
                underlineColorAndroid="#b51d22"
                onChangeText={searchText => this.setState({ searchText })}
                value={this.state.searchText}
                onBlur={() => {
                  this.setState({ isSearching: false });
                }}
                onSubmitEditing={() => {
                  this.setState({ isSearching: false, searchText: '' });
                  navigation.navigate('SearchPage', { title: this.state.searchText, categoryId: 0, query: this.state.searchText });
                }}
                clearTextOnFocus
              />
              :
              <Title style={{ color: '#b51d22' }}>{title}</Title>
          }

        </Body>
        <Right style={{ flex: 1 }} >
          {
            showShare ?
              <Button transparent onPress={this._shareText}>
                <Icon name="share" style={{ color: '#b51d22' }} />
              </Button>
              :
              <Button
                transparent
                onPress={() => {
                  if (this.state.isSearching) {
                    this.setState({ isSearching: false, searchText: '' });
                    navigation.navigate('SearchPage', { title: this.state.searchText, categoryId: 0, query: this.state.searchText });
                  } else {
                    this.setState({ isSearching: true });
                  }
                }}
              >
                <Icon name="search" style={{ color: '#b51d22' }} />
              </Button>
          }

        </Right>
        {
          this.state.isHandlingPushNotification ? <Spinner visible={this.state.isHandlingPushNotification} textContent={'Loading...'} textStyle={{ color: '#b51d22' }} color="#b51d22" /> : null
        }
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
