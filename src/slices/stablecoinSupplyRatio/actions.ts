import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../libs/api';

export const getStablecoinSupplyRatio = createAsyncThunk('stablecoinSupplyRatio/getStablecoinSupplyRatio', async () =>
  api.getStablecoinSupplyRatio(),
);

export const getStablecoinTotalSupply = createAsyncThunk(
  'stablecoinSupplyRatio/getStablecoinTotalSupply',
  async (stablecoin: string) => api.getStablecoinTotalSupply(stablecoin),
);
