import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../types/types';
import { taskArray } from 'constants/taskArray';

type InitialStateType = {
  tasks: ITask[];
  currentTask: ITask | null;
};

const initialState: InitialStateType = {
  tasks: taskArray,
  currentTask: null,
};

const stateSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      state.tasks.push(action.payload);
    },
    addCurrentTask(state, action: PayloadAction<ITask | null>) {
      state.currentTask = action.payload;
    },
    changeTask(state, action: PayloadAction<ITask>) {
      const currentIndex: number = state.tasks.findIndex((task: ITask) => task.id === action.payload.id);

      state.tasks[currentIndex] = action.payload;
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((el) => action.payload !== el.id);
    },
  },
});

export const { addTask, addCurrentTask, changeTask, removeTask } = stateSlice.actions;

export default stateSlice.reducer;
