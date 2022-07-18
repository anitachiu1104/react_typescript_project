import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { walletReducer } from './slices/wallet/slice';
import { longShortReducer } from './slices/longShortIndex/slice';
import { socialMediaReducer } from './slices/socialMedia/slice';
import { stablecoinSupplyRatioReducer } from './slices/stablecoinSupplyRatio/slice';

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    longShortIndex: longShortReducer,
    socialMedia: socialMediaReducer,
    stablecoinSupplyRatio: stablecoinSupplyRatioReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
