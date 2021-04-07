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
  StyledheaderTitleContainer,
  StyledheaderTitle,
  StyledAddButton,
} from "./styles";
import { DataGrid } from "@material-ui/data-grid";

const Home = () => {
  const history = useHistory();

  const user = useContext(UserContext);
  const {
    fridgeData,
    loading,
    setFridge,
    addGrocery,
    deleteGrocery,
  } = useContext(FridgeContext);
  const { userInfo, tokenId } = user || {
    userInfo: { displayName: "", email: "", photoURL: "" },
  };
  const { fridge, fridges } = fridgeData;

  const groceries = fridge.groceries || [];

  const [displayAddModal, setDisplayAddModal] = useState(false);

  const [selectedGroceries, setSelectedGroceries] = useState([]);

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
      {userInfo !== null && (
        <StyledHomeHeaderContainer>
          <StyledheaderTitleContainer>
            <StyledheaderTitle>My Fridge</StyledheaderTitle>
          </StyledheaderTitleContainer>
          <StyledHeaderInfo>
            <h2 style={{ width: "max-content" }}>{userInfo.displayName}</h2>
            <StyledHomeImage src={userInfo.photoURL} alt="Profile Image" />
            <SignOutButton onClick={signOut} />
          </StyledHeaderInfo>
        </StyledHomeHeaderContainer>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          padding: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            width: "50%",
            height: "100%",
          }}
        >
          <StyledAddButton onClick={() => setDisplayAddModal(true)}>
            +
          </StyledAddButton>
          <StyledAddButton onClick={() => deleteGrocery(selectedGroceries)}>
            remove
          </StyledAddButton>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "50%",
            height: "100%",
          }}
        >
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
        </div>
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
          onSelectionModelChange={(newSelection) => {
            setSelectedGroceries(newSelection.selectionModel);
          }}
        />
      </div>
    </StyledHomeMainContainer>
  );
};

export default Home;
