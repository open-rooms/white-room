import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import authReducer from './auth-slice';

const configureCustomStore = () => {
  const reducer = combineReducers({
    // Persistent slices
    auth: authReducer,
  });

  const store = configureStore({
    reducer,
    devTools: {trace: true, traceLimit: 25},
    middleware: getDefaultMiddleware => {
      const defaultMiddleware = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });

      return defaultMiddleware;
    },
  });

  return store;
};

export const store = configureCustomStore();
