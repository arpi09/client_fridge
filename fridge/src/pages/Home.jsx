import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { SignOutButton } from "../components/SignOutButton";
import { auth } from "../firebase";
import {
  StyledHomeMainContainer,
  StyledHomeHeaderContainer,
  StyledHomeImage,
  StyledHeaderInfo,
} from "./styles";

const Home = () => {
  const history = useHistory();

  const user = useContext(UserContext);
  const { displayName, email, photoURL } = user || {
    displayName: "",
    email: "",
    photoURL: "",
  };

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    }
  }, [user]);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <StyledHomeMainContainer>
      <StyledHomeHeaderContainer>
        <StyledHeaderInfo>
          <h2>{displayName}</h2>
          <StyledHomeImage src={photoURL} alt="Profile Image" />
          <SignOutButton onClick={signOut} />
        </StyledHeaderInfo>
      </StyledHomeHeaderContainer>
    </StyledHomeMainContainer>
  );
};

export default Home;
