import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { FridgeContext } from "../providers/FridgeProvider";
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
  const { fridgeData, setFridge } = useContext(FridgeContext);
  const { userInfo, tokenId } = user || {
    userInfo: { displayName: "", email: "", photoURL: "" },
  };
  const { fridge, fridges } = fridgeData;

  const groceries = fridge && fridge.groceries;

  useEffect(() => {
    if (userInfo === null) {
      history.push("/login");
    }
  }, [user]);

  const signOut = () => {
    auth.signOut();
  };

  const test = () => {
    fetch(
      "https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/fridge/l49C4CTkVgbHSF7iE54P/grocery",
      {
        method: "POST",
        headers: {
          Authorization: tokenId,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "bestBefore", headerName: "Best Before", width: 130 },
  ];

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
      <select name="fridges" onChange={(e) => setFridge(e.target.value)}>
        {fridges &&
          fridges.map((fridge) => {
            return (
              <option key={fridge.id} value={fridge.id}>
                {fridge.name}
              </option>
            );
          })}
      </select>
      <div style={{ display: "flex", alignItems: "flex-start", width: "80%" }}>
        <button onClick={() => test()}>+</button>
      </div>
      {groceries && (
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
      )}
    </StyledHomeMainContainer>
  );
};

export default Home;
