/*
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

class ShowNotification {
    public constructor(type:string, message: string, tag: string) {
        Notification.requestPermission(function(result) {
            if (result === 'granted') {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification(type, {
                        body: message,
                        icon: 'images/favicon.png',
                        //vibrate: [200, 100, 200, 100, 200, 100, 200],
                        tag: tag
                    });
                });
            }
        });
    }
}