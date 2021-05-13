import React from "react";
import { auth } from "../../firebase";
import { SignOutButton } from "../../components/SignOutButton";
import * as styles from "./styles";

const FirstSetup = () => {
  return (
    <styles.StyledLFirstSetupMainContainer>
      <p>FirstSetup!</p>
      <SignOutButton onClick={() => auth.signOut()} />
    </styles.StyledLFirstSetupMainContainer>
  );
};

export default FirstSetup;
