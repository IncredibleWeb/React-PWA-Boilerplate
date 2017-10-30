# React PWA Boilerplate
A universal progressive web app boilerplate built using React + Redux.

## Usage
- Run `npm install` to install all the required dependencies
- Run `npm install -g webopen pack` to install webpack globally on your machine.
- Run `npm run build` to build the project using webpack configurations.
- Run `npm start` to start a node server on `localhost:3000`

## Progressive Web Apps
“Progressive web apps are ordinary mobile-friendly web applications that may be progressively enhanced into native-like applications through the modern browser.”

### Mobile Friendly Applications
At it’s core, a PWA is little more than an ordinary website; composed of HTML, CSS & JavaScript.

### Progressive Enhancement
A website must be built in a structured-layered approach, with rock-solid HTML & content and enhancements added to improve the user’s experience.

### Native Features
The most exciting aspect of a PWA is definitely the native-like user experience and features. A progressive web app is able to work offline, receive push notifications and should be optimized to work flawlessly on mobile devices.

### App-Shell Model
The “app-shell” could be compared to the code you would publish to the app store if you were building a native app. Inspiration taken from [application-shell](https://github.com/GoogleChrome/application-shell).

### Service Worker
A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction.

### Web App Manifest
A simple JSON file that must follow the specification available on [W3C](https://w3c.github.io/manifest/"), it is possible to run the web app in full-screen as a standalone application, assign an icon which will be displayed once the application is installed onto the device or assign a theme and background colour to your app. In addition, Chrome on Android also proactively suggests to the user to install the web app using [Web App install banners](https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android).

## Add to Homescreen
Add to home screen functionality is deferred and enables the 'Add to Homescreen' button on the settings once the browser attempt to show the popup.

## Offline Functionality
The application supports offline functionality and adds a grayscale filter when the user is connected. The content for the different pages will always be available through service worker Cache API while the data from the API (used in the learn page) will be cached by the browser. This could be extended to be stored through IndexedDB.

## Push Notifications
The application supports push notifications and shows a notification message. To enable push notifications, you must enable push from the Settings page. To test push notifications, you may use the following CURL command, replacing the `--SENDER_KEY--` (found in your GCM account) and `--REGISTRATION_ID--` (written to the console when the user enabled PUSH) with your own, ex:
```

curl -X POST \
-H "Authorization: key=--SENDER_KEY--" \
-H "Content-Type: application/json" \
-d '{ 
"registration_ids": [
"--REGISTRATION_ID--"
], 
"data": { 
"message": "Hello Message"
},
"priority": "high"
}' \
https://android.googleapis.com/gcm/send
```

### Technology
Built using React + Redux, runs on ExpressJS on the server-side and native JavaScript on the client-side.
