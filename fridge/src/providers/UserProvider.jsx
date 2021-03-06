import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext({
  tokenId: null,
  userInfo: {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    tokenId: null,
    userInfo: {},
    loading: true,
  });

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth
        ? userAuth
            .getIdToken(false)
            .then((idToken) => {
              setUser({
                tokenId: idToken,
                userInfo: userAuth,
                loading: false,
              });
            })
            .catch(function (error) {
              console.log(error);
            })
        : setUser({ tokenId: null, userInfo: userAuth, loading: false });
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
export default UserProvider;
