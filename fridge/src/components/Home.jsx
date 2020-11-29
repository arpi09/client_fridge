import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";

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

  console.log(user)

  return (
    <div>
      <div>
        <div
          style={{
            background: `url(${photoURL}) no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }}
        ></div>
        <div>
          <h2>{displayName}</h2>
          <h3>{email}</h3>
        </div>
      </div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default Home;
