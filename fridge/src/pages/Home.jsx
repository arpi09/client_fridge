import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { FridgeContext } from "../providers/FridgeProvider";
import { SignOutButton } from "../components/SignOutButton";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Modal } from "../components/Modal";
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
  const { fridgeData, loading, setFridge } = useContext(FridgeContext);
  const { userInfo, tokenId } = user || {
    userInfo: { displayName: "", email: "", photoURL: "" },
  };
  const { fridge, fridges } = fridgeData;

  const groceries = fridge.groceries || [];

  const [displayAddModal, setDisplayAddModal] = useState(false);

  useEffect(() => {
    if (userInfo === null) {
      history.push("/login");
    }
  }, [user]);

  const signOut = () => {
    auth.signOut();
  };

  const test = () => {
    setDisplayAddModal(true);
    // fetch(
    //   "https://us-central1-fridge-23daa.cloudfunctions.net/app/api/user/fridge/l49C4CTkVgbHSF7iE54P/grocery",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: tokenId,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "bestBefore", headerName: "Best Before", width: 130 },
  ];

  const modalContent = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h4 style={{ margin: "50px 0px 0px 20px" }}>Name</h4>
      <Input />
      <h4 style={{ margin: "15px 0px 0px 20px" }}>BestBefore</h4>
      <Input />
      <Button onClick={() => console.log("Adding!")} text="Add" />
    </div>
  );

  return (
    <StyledHomeMainContainer>
      <Modal
        display={displayAddModal}
        title="Add grocery"
        content={modalContent}
        onClose={() => setDisplayAddModal()}
      />
      {userInfo !== null ? (
        <StyledHomeHeaderContainer>
          <StyledHeaderInfo>
            <h2>{userInfo.displayName}</h2>
            <StyledHomeImage src={userInfo.photoURL} alt="Profile Image" />
            <SignOutButton onClick={signOut} />
          </StyledHeaderInfo>
        </StyledHomeHeaderContainer>
      ) : null}
      <select
        name="fridges"
        onChange={(e) => setFridge(e.target.value)}
        style={{
          borderWidth: "0px",
          borderRadius: "5px",
          width: "15rem",
          height: "3rem",
          fontSize: "18px",
        }}
      >
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
          loading={loading}
        />
      </div>
    </StyledHomeMainContainer>
  );
};

export default Home;
