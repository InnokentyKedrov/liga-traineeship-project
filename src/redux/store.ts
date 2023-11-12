import { MiddlewareArray, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import taskReducer from './taskSlice';
import loadingReducer from './loadingSlice';
import errorReducer from './errorSlice';

const store = configureStore({
  reducer: {
    todo: taskReducer,
    loading: loadingReducer,
    error: errorReducer,
  },
  middleware: new MiddlewareArray().concat(logger).concat(thunkMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
