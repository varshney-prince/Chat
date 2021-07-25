import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyC1YbTCGB7N9BFoGnyqBdDohFsCxxpXVmE",
    authDomain: "chatmate-381c4.firebaseapp.com",
    databaseURL: "https://chatmate-381c4-default-rtdb.firebaseio.com",
    projectId: "chatmate-381c4",
    storageBucket: "chatmate-381c4.appspot.com",
    messagingSenderId: "700710235536",
    appId: "1:700710235536:web:98eae2637201cb49e59715"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.database();