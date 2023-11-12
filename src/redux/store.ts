import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import taskReducer from './taskSlice';
import loadingReducer from './loadingSlice';
import errorReducer from './errorSlice';

// const thunkMiddleware = thunk as unknown as ThunkDispatch<RootStateType, undefined, AnyAction>;

const store = configureStore({
  reducer: combineReducers({
    todo: taskReducer,
    loading: loadingReducer,
    error: errorReducer,
  }),
  middleware: [thunkMiddleware, logger] as const,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
