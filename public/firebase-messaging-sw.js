 // Scripts for firebase and firebase messaging
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

 // Initialize the Firebase app in the service worker by passing the generated config
 const firebaseConfig = {
    apiKey: "AIzaSyCayU36YLSB3uZFGSjxQHuYpikJYW9fhKU",
    authDomain: "battle-lab-d4083.firebaseapp.com",
    databaseURL: "https://battle-lab-d4083-default-rtdb.firebaseio.com",
    projectId: "battle-lab-d4083",
    storageBucket: "battle-lab-d4083.appspot.com",
    messagingSenderId: "950002900597",
    appId: "1:950002900597:web:11ff89ecc4651bf51c223c",
    measurementId: "G-16JHDXCB0L"
 };

 firebase.initializeApp(firebaseConfig);

 // Retrieve firebase messaging
 const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });
