import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const FridgeContext = createContext({
  fridges: [],
  fridge: {},
});

const FridgeProvider = ({ children }) => {
  const [fridgeData, setFridgeData] = useState({
    fridges: [],
    fridge: {},
    selectedFridge: null,
  });

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth
        .getIdToken(true)
        .then((idToken) => {
          fetch(
            "http://localhost:5001/fridge-23daa/us-central1/app/api/user/fridges",
            {
              method: "GET",
              headers: {
                Authorization: idToken,
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => data)
            .then((data) => {
              const fridges = data;
              const defaultFridgeId = fridges[0].id;

              fetch(
                `http://localhost:5001/fridge-23daa/us-central1/app/api/user/fridge/${defaultFridgeId}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: idToken,
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  setFridgeData({
                    fridges: fridges,
                    fridge: data,
                  });
                });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  const setFridge = (id) => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth.getIdToken(true).then((idToken) => {
        console.log(id);
        fetch(
          `http://localhost:5001/fridge-23daa/us-central1/app/api/user/fridge/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: idToken,
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setFridgeData((oldFridgeData) => ({
              ...oldFridgeData,
              fridge: data,
            }));
          });
      });
    });
  };

  return (
    <FridgeContext.Provider value={{ fridgeData, setFridge }}>
      {children}
    </FridgeContext.Provider>
  );
};
export default FridgeProvider;
