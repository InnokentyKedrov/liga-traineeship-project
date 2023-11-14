import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import taskReducer from './slices/taskSlice';
import loadingReducer from './slices/loadingSlice';
import errorReducer from './slices/errorSlice';
import filterReducer from './slices/filterSlice';

// const thunkMiddleware = thunk as unknown as ThunkDispatch<RootStateType, undefined, AnyAction>;

const store = configureStore({
  reducer: combineReducers({
    todo: taskReducer,
    loading: loadingReducer,
    error: errorReducer,
    filter: filterReducer,
  }),
  middleware: [thunkMiddleware, logger] as const,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
