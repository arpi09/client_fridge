import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext({
  tokenId: null,
  userInfo: {},
  groceries: [],
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    tokenId: null,
    userInfo: {},
  });

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth &&
        userAuth
          .getIdToken(false)
          .then((idToken) => {
            setUser({
              tokenId: idToken,
              userInfo: userAuth,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
