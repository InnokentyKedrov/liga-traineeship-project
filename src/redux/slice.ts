import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodosType } from '../types/types';
import { taskArray } from 'constants/taskArray';
import { ITask } from 'components/Task/Task.types';

const initialState: ITask[] = taskArray;

const stateSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TodosType>) {
      state.push(action.payload);
    },
  },
});

export const { addTask } = stateSlice.actions;

export default stateSlice.reducer;
