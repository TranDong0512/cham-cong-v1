import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
    TypedUseSelectorHook,
  } from "react-redux";
const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'nmt',
    whitelist: ['white_list',]
  }
const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeQLC = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
export default storeQLC;

export const persistor = persistStore(storeQLC);

export type RootState = ReturnType<typeof storeQLC.getState>;
export type AppDispatch = typeof storeQLC.dispatch;
const { dispatch } = storeQLC;

export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { dispatch };