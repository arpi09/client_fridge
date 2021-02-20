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
    groceries: [],
  });

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      setUser({ tokenId: null, userInfo: userAuth, groceries: [] });

      userAuth &&
        userAuth
          .getIdToken(false)
          .then((idToken) => {
            fetch(
              "https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/fridge/l49C4CTkVgbHSF7iE54P/groceries",
              {
                method: "GET",
                headers: {
                  Authorization: idToken,
                  "Content-Type": "application/json",
                },
              }
            )
              .then((response) => response.json())
              .then((data) =>
                setUser({
                  tokenId: idToken,
                  userInfo: userAuth,
                  groceries: data,
                })
              );
          })
          .catch(function (error) {
            console.log(error);
          });
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
