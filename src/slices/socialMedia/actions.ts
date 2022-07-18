import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../libs/api';

const getSocialMediaLatest = createAsyncThunk('socialMedia/getSocialMediaLatest', async (params: { social: string }) =>
  api.getSocialMediaLatest(params),
);

const getSocialMediaList = createAsyncThunk('socialMedia/getSocialMediaList', async () =>
  api.getSocialMediaNameList({ social: 'telegram' }),
);

const getSocialMediaHistory = createAsyncThunk('socialMedia/getSocialMediaHistory', async (params: { id: string }) =>
  api.getSocialMediaHistory(params),
);

export const socialMediaActions = {
  getSocialMediaLatest,
  getSocialMediaList,
  getSocialMediaHistory,
};
