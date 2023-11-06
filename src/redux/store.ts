import { MiddlewareArray, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import stateReducer from './slice';

const store = configureStore({
  reducer: stateReducer,
  middleware: new MiddlewareArray().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
