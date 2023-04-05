import { createSlice } from "@reduxjs/toolkit";
import contracts from "../fakeDB/contracts";

const initialState = {
  contracts: contracts,
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    createContract: (state, action) => {
      state.contracts.push({ ...action.payload });
    },
    // getContract: (state, action) => {
    //   state.contract = contracts.find(
    //     (contract) => contract.id === action.payload.id
    //   );
    // },
    updateContract: (state, action) => {
      const updateId = state.contracts.findIndex(
        (contract) => contract.id === action.payload.id
      );
      state.contracts[updateId] = { ...action.payload };
      // console.log(state.contracts);
    },
  },
});

export const { createContract, getContract, updateContract } =
  contractSlice.actions;

export default contractSlice.reducer;
