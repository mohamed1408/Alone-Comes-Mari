import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';

PushNotification.configure({

    // onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    // },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    default: true,
    popInitialNotification: true,
    requestPermissions: true,
});

PushNotification.createChannel(
    {
        channelId: "AlongComesMari",
        channelName: "AlongComesMari chanel",
        channelDescription: "My channel AlongComesMari",
        playSound: true,
        soundName: "default",
        importance: Importance.HIGH,
        vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
);

const ForegroundHandler = (props) => {
    useEffect(() => {
        messaging().onMessage(async (remoteMessage) => {
            PushNotification.localNotification({
                channelId: "AlongComesMari",
                channelName: "AlongComesMari chanel",
                channelDescription: "My channel AlongComesMari",
                message: remoteMessage.notification.body,
                title: remoteMessage.notification.title,
                bigPictureUrl: remoteMessage.notification.android.imageUrl,
                smallIcon: remoteMessage.notification.android.imageUrl,
            });
        });
    }, []);

    return null;
};

export default ForegroundHandler;