import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
export const AuthContext = createContext();
import { onAuthStateChanged } from "firebase/auth";
export default function AuthWrapper({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("loader", loading);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      } else {
      }
    });
    setLoading(false);
  }, []);
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  const store = {
    login,
    logOut,
    user
  }
  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
