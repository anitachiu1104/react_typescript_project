import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { SocialMedia, SocialMediaHistory, SocialMediaLatest } from '../../types';
import { socialMediaActions as actions } from './actions';

interface SocialMediaSliceState {
  socialMediaLatest: Record<string, SocialMediaLatest[]>;
  socialMediaList: SocialMedia[];
  socialMediaHistory: SocialMediaHistory[];
}

const slice = createSlice<SocialMediaSliceState, SliceCaseReducers<SocialMediaSliceState>>({
  name: 'socialMedia',
  initialState: {
    socialMediaLatest: {},
    socialMediaList: [],
    socialMediaHistory: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getSocialMediaLatest.fulfilled, (state, { payload, meta }) => ({
        ...state,
        socialMediaLatest: { ...state.socialMediaLatest, [meta.arg.social]: payload },
      }))
      .addCase(actions.getSocialMediaList.fulfilled, (state, { payload }) => ({
        ...state,
        socialMediaList: payload,
      }))
      .addCase(actions.getSocialMediaHistory.fulfilled, (state, { payload }) => ({
        ...state,
        socialMediaHistory: payload,
      }));
  },
});

export const socialMediaReducer = slice.reducer;
