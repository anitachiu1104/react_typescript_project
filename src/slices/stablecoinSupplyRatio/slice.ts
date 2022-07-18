import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { StablecoinSupplyRatio, StablecoinTotalSupply } from '../../types';
import { getStablecoinSupplyRatio, getStablecoinTotalSupply } from './actions';

interface StablecoinSupplyRatioState {
  stablecoinSupplyRatio: StablecoinSupplyRatio[];
  usdc: StablecoinTotalSupply[];
  usdt: StablecoinTotalSupply[];
  busd: StablecoinTotalSupply[];
  dai: StablecoinTotalSupply[];
}

const slice = createSlice<StablecoinSupplyRatioState, SliceCaseReducers<StablecoinSupplyRatioState>>({
  name: 'stablecoinSupplyRatio',
  initialState: {
    stablecoinSupplyRatio: [],
    usdc: [],
    usdt: [],
    busd: [],
    dai: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStablecoinSupplyRatio.fulfilled, (state, { payload }) => ({
        ...state,
        stablecoinSupplyRatio: payload,
      }))
      .addCase(getStablecoinTotalSupply.fulfilled, (state, { payload, meta }) => ({
        ...state,
        [meta.arg]: payload,
      }));
  },
});

export const stablecoinSupplyRatioReducer = slice.reducer;
