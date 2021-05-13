import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { FridgeContext } from "../../providers/FridgeProvider";
import { SignOutButton } from "../../components/SignOutButton";
import { Button } from "../../components/Button";
import { AddGroceryModal } from "../../components/AddGroceryModal";
import { auth } from "../../firebase";
import * as styles from "./styles";
import * as constants from "./constants";
import { DataGrid } from "@material-ui/data-grid";
import moment from "moment";

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
  const { fridge, fridges, loading } = fridgeData || {
    fridge: {},
    fridges: [],
    loading: false,
  };

  const [groceries, setGroceries] = useState([]);

  const [displayAddModal, setDisplayAddModal] = useState(false);

  const [selectedGroceries, setSelectedGroceries] = useState([]);

  // Effect which directs to login page if user is not logged in
  useEffect(() => {
    if (userInfo === null) {
      history.push("/");
    }
  }, [history, userInfo]);

  // Format best before dates for groceries
  useEffect(() => {
    fridge.groceries =
      fridge.groceries &&
      fridge.groceries.map((grocery) => {
        return {
          ...grocery,
          bestBefore: moment(grocery.bestBefore).format(constants.DATE_FORMAT),
        };
      });

    setGroceries(fridge.groceries);
  }, [fridge]);

  // Add slider column
  const columns = [
    ...constants.GROCERIES_TABLE_COLUMNS,
    {
      field: constants.GRID_COLUMN_FIELD_NAME_SLIDER,
      headerName: constants.GRID_COLUMN_HEADER_TITLE_SLIDER,
      flex: 3,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <styles.StyledSliderContainer>
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
        </styles.StyledSliderContainer>
      ),
    },
  ];

  const handleAddGrocery = (
    addModalNameText,
    addModalFullAmountText,
    addModalAmountTypetText,
    bestBeforeDate
  ) => {
    const newGrocery = {
      name: addModalNameText,
      fullAmount: parseInt(addModalFullAmountText, 10),
      amountType: addModalAmountTypetText,
      bestBefore: bestBeforeDate,
    };

    setDisplayAddModal(false);
    addGrocery(newGrocery);
  };

  const handleDeleteGroceries = () => {
    deleteGroceries(selectedGroceries);
    setSelectedGroceries([]);
  };

  const handleSliderChanged = (value, id) => {
    const grocery = { amount: parseInt(value, 10), id: id };

    // Find updated grocery index in groceries
    const updatedGroceryIndex = groceries.findIndex((grocery) => {
      return grocery.id === id;
    });

    // Update groceries with new value of slider
    let tempArray = [...groceries];
    tempArray[updatedGroceryIndex] = {
      ...tempArray[updatedGroceryIndex],
      amount: parseInt(value, 10),
    };

    setGroceries(tempArray);
    updateGrocery(grocery);
  };

  const userNotLoggedIn =
    user.loading || !user.userInfo || Object.keys(user.userInfo).length === 0;

  return (
    <div style={{ height: "100%" }}>
      {userNotLoggedIn ? (
        <styles.StyledHomeMainContainer>
          <div className="loader"></div>
        </styles.StyledHomeMainContainer>
      ) : (
        <styles.StyledHomeMainContainer>
          <AddGroceryModal
            display={displayAddModal}
            title="Add grocery"
            addFunction={(
              addModalNameText,
              addModalFullAmountText,
              addModalAmountTypetText,
              bestBeforeDate
            ) =>
              handleAddGrocery(
                addModalNameText,
                addModalFullAmountText,
                addModalAmountTypetText,
                bestBeforeDate
              )
            }
            onClose={() => setDisplayAddModal()}
          />
          {userInfo !== null && (
            <styles.StyledHomeHeaderContainer>
              <styles.StyledHeaderTitleContainer>
                <styles.StyledHeaderTitle>My Fridge</styles.StyledHeaderTitle>
              </styles.StyledHeaderTitleContainer>
              <styles.StyledHeaderInfo>
                <h2 style={{ width: "max-content" }}>
                  {userInfo.displayName === null
                    ? userInfo.email
                    : userInfo.displayName}
                </h2>
                {userInfo.photoURL && (
                  <styles.StyledHomeImage
                    src={userInfo.photoURL}
                    alt="Profile Image"
                  />
                )}
                <SignOutButton onClick={() => auth.signOut()} />
              </styles.StyledHeaderInfo>
            </styles.StyledHomeHeaderContainer>
          )}
          <styles.StyledGridHeaderContainer>
            <styles.StyledGridHeaderActionContainer
              style={{
                justifyContent: "flex-start",
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
            </styles.StyledGridHeaderActionContainer>
            <styles.StyledGridHeaderActionContainer
              style={{
                justifyContent: "flex-end",
              }}
            >
              <styles.StyledSelectFridge
                name="fridges"
                onChange={(e) => setFridge(e.target.value)}
              >
                {fridges &&
                  fridges.map((fridge) => {
                    return (
                      <option key={fridge.id} value={fridge.id}>
                        {fridge.name}
                      </option>
                    );
                  })}
              </styles.StyledSelectFridge>
            </styles.StyledGridHeaderActionContainer>
          </styles.StyledGridHeaderContainer>
          <styles.StyledDataGridContainer>
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
          </styles.StyledDataGridContainer>
        </styles.StyledHomeMainContainer>
      )}
    </div>
  );
};

export default Home;
