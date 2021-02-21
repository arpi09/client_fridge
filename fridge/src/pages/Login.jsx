import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithGoogle, auth } from "../firebase";
import { UserContext } from "../providers/UserProvider";
import { Input } from "../components/Input";
import { SignInButton } from "../components/SignInButton";
import { ThirdPartySignInButton } from "../components/ThirdPartySignInButton";
import { StyledLoginMainContainer, StyledLoginHeaderText } from "./styles";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const user = useContext(UserContext);

  const signInWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
    });
  };

  const signInWithGoogleClick = (event) => {
    event.preventDefault();

    signInWithGoogle();
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  useEffect(() => {
    if (user.userInfo && Object.keys(user.userInfo).length !== 0) {
      history.push("/");
    }
  }, [user]);

  return (
    <StyledLoginMainContainer>
      <StyledLoginHeaderText>My fridge</StyledLoginHeaderText>
      {error !== null && <div>{error}</div>}
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
          signInWithEmailAndPasswordHandler(event, email, password);
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
      <p style={{ color: "#fff" }}>
        Don't have an account? <Link to="signUp">Sign up here</Link>
      </p>
      <Link to="passwordReset">Forgot Password?</Link>
    </StyledLoginMainContainer>
  );
};

export default Login;
