import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { LongShortIndex } from '../../types';
import { longShortIndexActions as actions } from './actions';

interface LongShortIndexSliceState {
  selectedContractType: string;
  selectedExchange: string;
  selectedPair: string;
  selectedCurrency: string;
  longShortIndex: Record<string, LongShortIndex[]>;
  loadingLongShortIndex: boolean;
}

const slice = createSlice<LongShortIndexSliceState, SliceCaseReducers<LongShortIndexSliceState>>({
  name: 'longShortIndex',
  initialState: {
    selectedContractType: 's',
    selectedExchange: 'o',
    selectedPair: 'bt',
    selectedCurrency: '',
    longShortIndex: {},
    loadingLongShortIndex: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.selectContractType, (state, { payload }) => ({
        ...state,
        selectedContractType: payload,
      }))
      .addCase(actions.selectExchange, (state, { payload }) => ({
        ...state,
        selectedExchange: payload,
      }))
      .addCase(actions.selectPair, (state, { payload }) => ({
        ...state,
        selectedPair: payload,
      }))
      .addCase(actions.selectCurrency, (state, { payload }) => ({
        ...state,
        selectedCurrency: payload,
      }))
      .addCase(actions.getLongShortIndexList.pending, (state) => ({
        ...state,
        loadingLongShortIndex: true,
      }))
      .addCase(actions.getLongShortIndexList.fulfilled, (state, { payload, meta }) => {
        const longShortIndex = { ...state.longShortIndex };

        meta.arg.forEach((abbr, index) => {
          longShortIndex[abbr] = payload[index];
        });

        return {
          ...state,
          longShortIndex,
          loadingLongShortIndex: false,
        };
      })
      .addCase(actions.getLongShortIndexList.rejected, (state) => ({
        ...state,
        loadingLongShortIndex: false,
      }));
  },
});

export const longShortReducer = slice.reducer;
