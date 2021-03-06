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

  .loader {
    display: flex;
    justify-content: center;
  }

  .loader::after {
    content: "";
    width: 100px;
    height: 100px;
    border: 10px solid transparent;
    border-top-color: #564466;
    border-radius: 100%;
    animation: loader 1.5s ease infinite;
  }

  @keyframes loader {
    to {
      transform: rotate(2turn);
    }
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

export const StyledHeaderTitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const StyledGridHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  padding: 5px;
  margin-top: 5%;
`;

export const StyledGridHeaderActionContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const StyledHeaderTitle = styled.h2`
  font-size: 42px;
  margin-left: 2.5rem;
`;

export const StyledAddButton = styled.button`
  height: 100%;
  width: 4rem;
  border-radius: 5px;
  border-width: 0px;
`;

export const StyledSelectFridge = styled.select`
  border-width: 0px;
  border-radius: 5px;
  width: 15rem;
  height: 3rem;
  font-size: 18px;
  margin: 0.5rem;
`;

export const StyledDataGridContainer = styled.div`
  display: flex;
  width: 80%;
  height: 75%;
`;

export const StyledSliderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 5px;

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 7px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    border-radius: 20px;
    margin-right: 10px;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: #564466;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #4caf50;
    cursor: pointer;
  }
`;
