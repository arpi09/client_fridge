import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { FridgeContext } from "../../providers/FridgeProvider";
import { SignOutButton } from "../../components/SignOutButton";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { auth } from "../../firebase";
import {
  StyledHomeMainContainer,
  StyledHomeHeaderContainer,
  StyledHomeImage,
  StyledHeaderInfo,
  StyledheaderTitleContainer,
  StyledheaderTitle,
  StyledSliderContainer,
} from "./styles";
import { DataGrid } from "@material-ui/data-grid";

const Home = () => {
  const history = useHistory();

  const user = useContext(UserContext);
  const {
    fridgeData,
    setFridge,
    addGrocery,
    deleteGroceries,
    updateGrocery,
  } = useContext(FridgeContext);
  const { userInfo } = user || {
    userInfo: { displayName: "", email: "", photoURL: "" },
  };
  const { fridge, fridges, loading } = fridgeData;

  const [groceries, setGroceries] = useState([]);

  const [displayAddModal, setDisplayAddModal] = useState(false);

  const [selectedGroceries, setSelectedGroceries] = useState([]);

  console.log(userInfo);

  useEffect(() => {
    if (userInfo === null) {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    setGroceries(fridge.groceries);
  }, [fridge]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      disableClickEventBubbling: true,
    },
    {
      field: "bestBefore",
      headerName: "Best Before",
      flex: 1,
      disableClickEventBubbling: true,
    },
    {
      field: "slider",
      headerName: "Slider",
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <StyledSliderContainer>
          <input
            type="range"
            min="1"
            max="100"
            defaultValue={params.row.amount || 0}
            onMouseUp={(event) =>
              handleSliderChanged(event.target.value, params.id)
            }
            className="slider"
          />
          <p>{params.row.amount}%</p>
        </StyledSliderContainer>
      ),
    },
  ];

  const handleAddGrocery = (addModalNameText, addModalDateText) => {
    const newGrocery = { name: addModalNameText, bestBefore: addModalDateText };

    setDisplayAddModal(false);
    addGrocery(newGrocery);
  };

  const handleDeleteGroceries = () => {
    deleteGroceries(selectedGroceries);
    setSelectedGroceries([]);
  };

  const handleSliderChanged = (value, id) => {
    const grocery = { amount: parseInt(value, 10), id: id };

    const updatedGroceryIndex = groceries.findIndex((grocery) => {
      return grocery.id === id;
    });

    let tempArray = [...groceries];
    tempArray[updatedGroceryIndex] = {
      ...tempArray[updatedGroceryIndex],
      amount: parseInt(value, 10),
    };

    setGroceries(tempArray);

    updateGrocery(grocery);
  };

  const signOut = () => {
    auth.signOut();
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
            <h2 style={{ width: "max-content" }}>
              {userInfo.displayName === null
                ? userInfo.email
                : userInfo.displayName}
            </h2>
            {userInfo.photoURL && (
              <StyledHomeImage src={userInfo.photoURL} alt="Profile Image" />
            )}
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
          <Button
            onClick={() => handleDeleteGroceries()}
            text="Delete"
            remove
            disabled={selectedGroceries.length === 0}
            width="5"
          ></Button>
          <Button
            onClick={() => setDisplayAddModal(true)}
            text="Add"
            primary
            width="17"
          ></Button>
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
          width: "80%",
          height: "50%",
        }}
      >
        <DataGrid
          rows={groceries || []}
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
