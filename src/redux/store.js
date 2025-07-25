// store/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './features/api/userSlice';
import authReducer from './features/api/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  [userSlice.reducerPath]: userSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['auth'],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userSlice.middleware),
});

export const persistor = persistStore(store);
