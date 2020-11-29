import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { SignOutButton } from "../components/SignOutButton";
import { auth } from "../firebase";
import { useTable } from "react-table";
import {
  StyledHomeMainContainer,
  StyledHomeHeaderContainer,
  StyledHomeImage,
  StyledHeaderInfo,
} from "./styles";

const Home = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  const history = useHistory();
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

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

  return (
    <StyledHomeMainContainer>
      <StyledHomeHeaderContainer>
        <StyledHeaderInfo>
          <h2>{displayName}</h2>
          <StyledHomeImage src={photoURL} alt="Profile Image" />
          <SignOutButton onClick={signOut} />
        </StyledHeaderInfo>
      </StyledHomeHeaderContainer>
      <table {...getTableProps()} style={{ border: "solid 1px #000", borderRadius: "5px" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledHomeMainContainer>
  );
};

export default Home;
