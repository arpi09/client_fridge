import styled from "styled-components";

export const StyledLoginMainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  background-color: #92b39e;
`;

export const StyledLoginHeaderText = styled.h1`
  margin-bottom: 5rem;
`;

export const StyledHomeMainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  background-color: #92b39e;

  .MuiDataGrid-root {
    background-color: #fff;
  }
`;

export const StyledHomeHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 3rem;
  width: 100%;
  justify-content: flex-end;
  background-color: #transparent;
  position: absolute;
  top: 0px;
  padding-top: 1rem;
`;

export const StyledHomeImage = styled.img`
  height: 3rem;
  width: auto;
  border-radius: 3rem;
  margin-left: 1rem;
`;

export const StyledHeaderInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
`;
