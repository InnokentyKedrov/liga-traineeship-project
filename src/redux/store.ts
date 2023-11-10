import { MiddlewareArray, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import taskReducer from './taskSlice';

const store = configureStore({
  reducer: taskReducer,
  middleware: new MiddlewareArray().concat(logger).concat(thunkMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
