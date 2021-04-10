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
    loading: true,
  });

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth &&
        userAuth
          .getIdToken(true)
          .then((idToken) => {
            setFridgeData({ ...fridgeData, loading: true });

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
                        loading: false,
                      });
                    });
                }
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
          setFridgeData({ ...fridgeData, loading: true });
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
                loading: false,
              }));
            });
        });
    });
  };

  const addGrocery = (grocery) => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth &&
        userAuth.getIdToken(true).then((idToken) => {
          setFridgeData({ ...fridgeData, loading: true });
          fetch(
            `http://localhost:5001/fridge-23daa/us-central1/app/api/user/fridge/${fridgeData.selectedFridgeId}/grocery`,
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
                loading: false,
              }));
            });
        });
    });
  };

  const deleteGroceries = (groceries) => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth &&
        userAuth.getIdToken(true).then((idToken) => {
          setFridgeData({ ...fridgeData, loading: true });
          fetch(
            `https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/fridge/${fridgeData.selectedFridgeId}/grocery`,
            {
              method: "DELETE",
              headers: {
                Authorization: idToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ groceries: groceries }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setFridgeData((oldFridgeData) => ({
                ...oldFridgeData,
                fridge: data,
                loading: false,
              }));
            });
        });
    });
  };

  const updateGrocery = (grocery) => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth &&
        userAuth.getIdToken(true).then((idToken) => {
          fetch(
            `https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/fridge/${fridgeData.selectedFridgeId}/grocery`,
            {
              method: "PUT",
              headers: {
                Authorization: idToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ grocery: grocery }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setFridgeData((oldFridgeData) => ({
                ...oldFridgeData,
                fridge: data,
                loading: false,
              }));
            });
        });
    });
  };

  return (
    <FridgeContext.Provider
      value={{
        fridgeData,
        setFridge,
        addGrocery,
        deleteGroceries,
        updateGrocery,
      }}
    >
      {children}
    </FridgeContext.Provider>
  );
};
export default FridgeProvider;
