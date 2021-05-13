import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { signInWithGoogle, auth } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import { FridgeContext } from "../../providers/FridgeProvider";
import { Input } from "../../components/Input";
import { SignInButton } from "../../components/SignInButton";
import { ThirdPartySignInButton } from "../../components/ThirdPartySignInButton";
import * as styles from "./styles";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { fridgeData } = useContext(FridgeContext);

  const signInWithEmailAndPasswordHandler = useCallback(() => {
    setLoginLoading(true);

    auth.signInWithEmailAndPassword(email, password).catch(() => {
      setLoginLoading(false);
      setError("Wrong password or username!");
    });
  }, [email, password, setLoginLoading]);

  const signInWithGoogleClick = (event) => {
    event.preventDefault();

    signInWithGoogle();
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }

    if (name === "userPassword") {
      setPassword(value);
    }
  };

  const handleEnterPress = useCallback(
    (event) => {
      const { key } = event;

      if (key === "Enter") {
        signInWithEmailAndPasswordHandler(event);
      }
    },
    [signInWithEmailAndPasswordHandler]
  );

  // Add eventlistener to log in with enter
  useEffect(() => {
    window.addEventListener("keydown", handleEnterPress);

    return () => {
      window.removeEventListener("keydown", handleEnterPress);
    };
  }, [handleEnterPress]);

  useEffect(() => {
    const userLoggedIn =
      user.userInfo && Object.keys(user.userInfo).length !== 0;
    const userOwnsFridge = fridgeData.fridges.length !== 0;

    console.log(userLoggedIn && userOwnsFridge);
    // If userinfo contains data and user has one or more fridges, direct user to start view
    if (userLoggedIn && userOwnsFridge) {
      history.push("/home");
    }

    // If userinfo contains data and user has no fridges, direct user to welcome view
    else if (userLoggedIn && !userOwnsFridge) {
      history.push("/welcome");
    }
  }, [user.userInfo, history, fridgeData]);

  const userAlreadyLoggedIn =
    user.loading || (user.userInfo && Object.keys(user.userInfo).length !== 0);

  return (
    <div style={{ height: "100%" }}>
      {userAlreadyLoggedIn ? (
        <styles.StyledLoginMainContainer>
          <div className="loginLoader"></div>
        </styles.StyledLoginMainContainer>
      ) : (
        <styles.StyledLoginMainContainer>
          <styles.StyledLoginHeaderText>My fridge</styles.StyledLoginHeaderText>
          {error && <styles.StyledErrorDiv>{error}</styles.StyledErrorDiv>}
          <Input
            type="email"
            name="userEmail"
            value={email}
            placeholder="Email"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <Input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <SignInButton
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event);
            }}
            loading={loginLoading}
          />
          <div
            style={{
              width: "15%",
              borderTop: "1px solid #fff",
              borderRadius: "5px",
            }}
          ></div>
          <ThirdPartySignInButton
            text="Sign in with Google"
            icon={<FaGoogle />}
            onClick={(event) => {
              signInWithGoogleClick(event);
            }}
          />
        </styles.StyledLoginMainContainer>
      )}
    </div>
  );
};

export default Login;
