import React from "react";
import { connect } from "react-redux";

import Toggle from "../toggle/toggle";

class PushNotificationToggle extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isEnabled: false
    };
  }

  componentDidMount() {
    const { onSetPushEnabled } = this.props;

    if (!("serviceWorker" in navigator)) {
      console.warn("Notifications aren't supported.");
      return;
    }

    if (!("showNotification" in ServiceWorkerRegistration.prototype)) {
      console.warn("Notifications aren't supported.");
      return;
    }

    // Check if push messaging is supported
    if (!("PushManager" in window)) {
      console.warn("Push messaging isn't supported.");
      return;
    }

    // if its denied, it's a permanent block until the user changes the permission
    if (Notification.permission === "denied") {
      console.warn("The user has blocked notifications.");
      return;
    }

    // we need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
      // do we already have a push message subscription?
      serviceWorkerRegistration.pushManager
        .getSubscription()
        .then(subscription => {
          if (!subscription) {
            return;
          }
          onSetPushEnabled(true);
        })
        .catch(err => {
          console.warn("Error during getSubscription()", err);
        });
    });

    this.setState({ isEnabled: true });
  }

  handleChange(e) {
    const { onSetPushEnabled } = this.props;

    if (e.target.checked) {
      // enable push
      subscribe().then(response => {
        onSetPushEnabled(response);
        if (!response) {
          this.setState({ isEnabled: false });
        }
      });
    } else {
      // disable push
      unsubscribe().then(response => {
        onSetPushEnabled(!response);
      });
    }
  }

  render() {
    const { isPushEnabled } = this.props;
    return (
      <Toggle
        {...this.props}
        checked={isPushEnabled}
        disabled={!this.state.isEnabled}
        onChange={this.handleChange}
      />
    );
  }
}

const subscribe = () => {
  return new Promise((resolve, reject) => {
    if (Notification.permission === "denied") {
      return reject(new Error("Push messages are blocked."));
    }

    if (Notification.permission === "granted") {
      return resolve(true);
    }

    if (Notification.permission === "default") {
      Notification.requestPermission(result => {
        if (result !== "granted") {
          resolve(false);
        }
        resolve(true);
      });
    }
  })
    .then(() => {
      // We need the service worker registration to access the push manager
      return navigator.serviceWorker.ready
        .then(serviceWorkerRegistration => {
          return serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true
          });
        })
        .then(subscription => {
          if (
            subscription.endpoint.indexOf(
              "https://android.googleapis.com/gcm/send"
            ) === 0
          ) {
            let endpointParts = subscription.endpoint.split("/");
            let registrationId = endpointParts[endpointParts.length - 1];
            // TODO: add to notification hub
          }
          // user has subscribed successfully
          return true;
        })
        .catch(e => {
          console.warn(e);
          return false;
        });
    })
    .catch(e => {
      // permission prompt issue
      console.warn(e);
      return false;
    });
};

const unsubscribe = () => {
  return navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
    // to unsubscribe from push messaging, you need get the subscription object, which you can call unsubscribe() on.
    return serviceWorkerRegistration.pushManager
      .getSubscription()
      .then(pushSubscription => {
        // check we have a subscription to unsubscribe
        if (!pushSubscription) {
          // no subscription object, so set the state to allow the user to subscribe to push
          return false;
        }

        // we have a subscription, so call unsubscribe on it
        return pushSubscription
          .unsubscribe()
          .then(successful => {
            return true;
          })
          .catch(e => {
            // we failed to unsubscribe, this can lead to an unusual state, so may be best to remove the users data from your data store and inform the user that you have done so
            console.warn("Unsubscription error: ", e);
          });
      })
      .catch(e => {
        console.error(
          "Error thrown while unsubscribing from push messaging.",
          e
        );
      });
  });
};

export default PushNotificationToggle;
