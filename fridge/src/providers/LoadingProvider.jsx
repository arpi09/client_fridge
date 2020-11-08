import React, { Component, createContext, useState } from "react";
import { auth } from "../firebase";

export const LoadingContext = createContext({ loading: false });

const LoadingProvider = ({ children }) => {
  const [loading, toggleLoading] = useState({ loading: false });

  const setLoading = () => {
    toggleLoading((prevState) => {
      return {
        ...prevState,
        loadingCount: prevState.loadingCount + 1,
      };
    });
  };

  const unsetLoading = () => {
    toggleLoading((prevState) => {
      return {
        ...prevState,
        loadingCount:
          prevState.loadingCount > 0 ? prevState.loadingCount - 1 : 0,
      };
    });
  };

  return (
    <LoadingContext.Provider value={loading}>
      {children}
    </LoadingContext.Provider>
  );
};
export default LoadingProvider;
