//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyBaibHwnPmp6T1vY7_-GQwrnbhfj3ugW9w",
  authDomain: "comp1800-202330-bby01.firebaseapp.com",
  projectId: "comp1800-202330-bby01",
  storageBucket: "comp1800-202330-bby01.appspot.com",
  messagingSenderId: "285613630789",
  appId: "1:285613630789:web:ad7706d74fb23c2a854a2c"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var storage = firebase.storage();