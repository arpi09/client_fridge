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
import { DataGrid } from "@material-ui/data-grid";

const Home = () => {
  const history = useHistory();

  const user = useContext(UserContext);
  const { userInfo, groceries } = user || {
    userInfo: { displayName: "", email: "", photoURL: "" },
  };

  useEffect(() => {
    if (userInfo === null) {
      history.push("/login");
    }
  }, [user]);

  const signOut = () => {
    auth.signOut();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "bestBefore", headerName: "Best Before", width: 130 },
  ];

  console.log(groceries)

  return (
    <StyledHomeMainContainer>
      {userInfo !== null ? (
        <StyledHomeHeaderContainer>
          <StyledHeaderInfo>
            <h2>{userInfo.displayName}</h2>
            <StyledHomeImage src={userInfo.photoURL} alt="Profile Image" />
            <SignOutButton onClick={signOut} />
          </StyledHeaderInfo>
        </StyledHomeHeaderContainer>
      ) : null}
      <div style={{ display: "flex", alignItems: "flex-start", width: "80%" }}>
        <button>+</button>
      </div>
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          width: "80%",
          height: "50%",
        }}
      >
        <DataGrid
          rows={groceries}
          columns={columns}
          pageSize={5}
          checkboxSelection
          autoPageSize
        />
      </div>
    </StyledHomeMainContainer>
  );
};

export default Home;
