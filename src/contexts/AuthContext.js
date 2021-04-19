import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { db } from "../firebase.js";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const users = db.collection("users");

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        users.get().then((snap) => {
          snap.forEach((doc) => {
            let docData;
            docData = doc.data();
            if (user.email === docData.email && docData.isAdmin === true) {
              user.updateProfile({
                photoURL: "true",
              });
            } else {
              user.updateProfile({
                photoURL: "false",
              });
            }
          });
        });
      }

      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser, users]);

  const value = {
    currentUser,

    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
