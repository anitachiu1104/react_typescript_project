import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../libs/api';

const getLongShortIndexList = createAsyncThunk('longShortIndex/getLongShortIndexList', async (params: string[]) =>
  Promise.all(params.map((item) => api.getLongShortIndex(item))),
);

const selectContractType = createAction<string>('longShortIndex/selectContractType');
const selectExchange = createAction<string>('longShortIndex/selectExchange');
const selectPair = createAction<string>('longShortIndex/selectPair');
const selectCurrency = createAction<string>('longShortIndex/selectCurrency');

export const longShortIndexActions = {
  selectContractType,
  selectExchange,
  selectPair,
  selectCurrency,
  getLongShortIndexList,
};
