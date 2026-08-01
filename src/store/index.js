import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import uiReducer from './slices/uiSlice';
import notificationReducer from './slices/notificationSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  ui: uiReducer,
  notifications: notificationReducer,
  users: userReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'projects', 'ui', 'users'], // Persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
