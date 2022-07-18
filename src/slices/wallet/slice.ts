import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { Analysis, Protocol, Token } from '../../libs/api.type';

export interface WalletSliceState {
  analysisInfo?: Analysis;
  protocols: Protocol[];
  tokenList: Token[];
}

export const slice = createSlice<WalletSliceState, SliceCaseReducers<WalletSliceState>>({
  name: 'wallet',
  initialState: {
    protocols: [],
    tokenList: [],
  },
  reducers: {},
});

export const walletReducer = slice.reducer;
