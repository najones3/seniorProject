import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCuB3sR-BmmY7jGHbqsOdNcf1epJhwWJE0",
  authDomain: "seniorproject-3299c.firebaseapp.com",
  projectId: "seniorproject-3299c",
  storageBucket: "seniorproject-3299c.appspot.com",
  messagingSenderId: "370111478684",
  appId: "1:370111478684:web:1f0b3abaa1948144a4a659",
});

export const auth = app.auth();
export const db = app.firestore();
export default app;
