import styled from "styled-components";

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

export const StyledheaderTitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const StyledheaderTitle = styled.h2`
  font-size: 42px;
  margin-left: 2.5rem;
`;

export const StyledAddButton = styled.button`
  height: 100%;
  width: 4rem;
  border-radius: 5px;
  border-width: 0px;
`;
