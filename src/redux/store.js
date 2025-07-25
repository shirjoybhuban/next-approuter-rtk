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
import { quizSlice } from './features/api/quizSlice';
import authReducer from './features/api/authSlice';
import logReducer from './features/api/logSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  logs: logReducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [quizSlice.reducerPath]: quizSlice.reducer,
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
    }).concat(userSlice.middleware, quizSlice.middleware),
});

export const persistor = persistStore(store);
