import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCPW3IvnXV6Fk8a52d_1pzQwxqo5FqG7gQ",
  authDomain: "test-dafb6.firebaseapp.com",
  projectId: "test-dafb6",
  storageBucket: "test-dafb6.appspot.com",
  messagingSenderId: "230288741295",
  appId: "1:230288741295:web:774aa30dd6ab8fbca4555a",
});

export const auth = app.auth();
export const db = app.firestore();
export default app;
