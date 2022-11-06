import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
export const AuthContext = createContext();
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
export default function AuthWrapper({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
    setLoading(false);
  }, []);

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function autoLogOut(expireToken) {
    setTimeout(() => { logOut() }, expireToken)
  }

  const store = {
    login,
    logOut,
    user,
    forgotPassword,
    signUp,
    autoLogOut
  }

  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
