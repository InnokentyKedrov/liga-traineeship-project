import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import taskReducer from 'src/redux/slices/taskSlice';
import loadingReducer from 'src/redux/slices/loadingSlice';
import errorReducer from 'src/redux/slices/errorSlice';
import filterReducer from 'src/redux/slices/filterSlice';

const store = configureStore({
  reducer: combineReducers({
    todo: taskReducer,
    loading: loadingReducer,
    error: errorReducer,
    filter: filterReducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
