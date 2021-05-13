import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { signInWithGoogle, auth } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import { Input } from "../../components/Input";
import { SignInButton } from "../../components/SignInButton";
import { ThirdPartySignInButton } from "../../components/ThirdPartySignInButton";
import * as styles from "./styles";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const user = useContext(UserContext);

  const signInWithEmailAndPasswordHandler = useCallback(
    (event) => {
      event.preventDefault();

      auth.signInWithEmailAndPassword(email, password).catch((error) => {
        setError("Wrong password or username!");
      });
    },
    [email, password]
  );

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
    // If userinfo contains data direct user to start view
    if (user.userInfo && Object.keys(user.userInfo).length !== 0) {
      history.push("/start");
    }
  }, [user, history]);

  return (
    <div style={{ height: "100%" }}>
      {user.loading ? (
        <styles.StyledLoginMainContainer>
          <div className="loader"></div>
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
