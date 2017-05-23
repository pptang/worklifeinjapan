import React, { Component } from 'react';
import MainPage from './MainPage';
import ErrorBar from '../components/ErrorBar';
import { CATEGORY_LIST } from '../utils/constants';
import FCM, { FCMEvent } from 'react-native-fcm';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isShowingError: false,
    };
    this.handlePushNotification.bind(this);
  }
  componentDidMount() {
    this.handlePushNotification();
    fetch(CATEGORY_LIST)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          categories: res.filter(category => category.count),
        });
      })
      .catch(() => this.setState({ isShowingError: true }));
  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }

  handlePushNotification() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then((token) => {
      console.log('token:', token);
      // store fcm token in your server
    });
    FCM.subscribeToTopic('new-article');
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      console.log('notif::', notif);
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      if (notif.local_notification) {
        // this is a local notification
        console.log('local_notification::', notif);
      }
      if (notif.opened_from_tray) {
        console.log('notif_opened_tray::', notif);
        // app is open/resumed because user clicked banner
      }
      // await someAsyncCall();

      // if (Platform.OS === 'ios') {
      //   //optional
      //   //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
      //   //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //   //notif._notificationType is available for iOS platfrom
      //   switch (notif._notificationType) {
      //     case NotificationType.Remote:
      //       notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
      //       break;
      //     case NotificationType.NotificationResponse:
      //       notif.finish();
      //       break;
      //     case NotificationType.WillPresent:
      //       notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
      //       break;
      //   }
      // }

      FCM.presentLocalNotification({                                     // Android only, LED blinking (default false)
        large_icon: 'ic_launcher',                           // Android only
        icon: 'ic_launcher',
        show_in_foreground,                                // notification when app is in foreground (local & remote)
      });
    });
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log('refresh::', token);
      // fcm token may not be available on first load, catch it here
    });
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
