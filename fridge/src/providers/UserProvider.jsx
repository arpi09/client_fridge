import React, { Component, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext({ userInfo: {}, groceries: [] });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userInfo: {}, groceries: [] });

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      setUser({ userInfo: userAuth, groceries: [] })

      fetch(
        "https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/1/fridge/1/groceries"
      )
        .then((response) => response.json())
        .then((data) => setUser({ userInfo: userAuth, groceries: data }));
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
