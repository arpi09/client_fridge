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
    selectedFridgeId: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth &&
        userAuth
          .getIdToken(true)
          .then((idToken) => {
            setLoading(true);

            fetch(
              "https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/fridges",
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
                const fridges = data;

                if (data.length !== 0) {
                  const defaultFridgeId = fridges[0].id;

                  fetch(
                    `https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/fridge/${defaultFridgeId}`,
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
                      setFridgeData({
                        fridges: fridges,
                        fridge: data,
                        selectedFridgeId: defaultFridgeId,
                      });
                      setLoading(false);
                    });
                }
                setLoading(false);
              });
          })
          .catch((error) => {
            console.log(error);
          });
    });
  }, []);

  const setFridge = (fridgeId) => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth &&
        userAuth.getIdToken(true).then((idToken) => {
          setLoading(true);
          fetch(
            `https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/fridge/${fridgeId}`,
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
              setFridgeData((oldFridgeData) => ({
                ...oldFridgeData,
                fridge: data,
                selectedFridgeId: fridgeId,
              }));
              setLoading(false);
            });
        });
    });
  };

  const addGrocery = (grocery) => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth &&
        userAuth.getIdToken(true).then((idToken) => {
          setLoading(true);
          fetch(
            `https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/fridge/${fridgeData.selectedFridgeId}/grocery`,
            {
              method: "POST",
              headers: {
                Authorization: idToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(grocery),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setFridgeData((oldFridgeData) => ({
                ...oldFridgeData,
                fridge: data,
              }));
              setLoading(false);
            });
        });
    });
  };

  return (
    <FridgeContext.Provider
      value={{ fridgeData, loading, setFridge, addGrocery }}
    >
      {children}
    </FridgeContext.Provider>
  );
};
export default FridgeProvider;
