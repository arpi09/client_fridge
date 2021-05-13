import React from "react";
import { auth } from "../../firebase";
import { SignOutButton } from "../../components/SignOutButton";
import * as styles from "./styles";

const Welcome = () => {
  return (
    <styles.StyledLWelcomeMainContainer>
      <p>Welcome!</p>
      <SignOutButton onClick={() => auth.signOut()} />
    </styles.StyledLWelcomeMainContainer>
  );
};

export default Welcome;
