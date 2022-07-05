import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBimJRx5zgz3C2iXaNV7jsR1xFQqxfI5QY",
  authDomain: "mymoney-921c7.firebaseapp.com",
  projectId: "mymoney-921c7",
  storageBucket: "mymoney-921c7.appspot.com",
  messagingSenderId: "146591835344",
  appId: "1:146591835344:web:cb4503088187b8ad1e2ad5",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init firebase services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
