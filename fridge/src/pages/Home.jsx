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
  const { fridgeData, loading, setFridge, addGrocery } = useContext(
    FridgeContext
  );
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

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "bestBefore", headerName: "Best Before", flex: 1 },
  ];

  const handleAddGrocery = (addModalNameText, addModalDateText) => {
    const newGrocery = { name: addModalNameText, bestBefore: addModalDateText };
    setDisplayAddModal(false);
    addGrocery(newGrocery);
  };

  return (
    <StyledHomeMainContainer>
      <Modal
        display={displayAddModal}
        title="Add grocery"
        addFunction={(addModalNameText, addModalDateText) =>
          handleAddGrocery(addModalNameText, addModalDateText)
        }
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
        <button onClick={() => setDisplayAddModal(true)}>+</button>
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
