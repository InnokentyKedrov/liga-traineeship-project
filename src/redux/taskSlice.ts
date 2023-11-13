import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilteredType, ITask } from '../types/types';

const ADD_ALL_TASK = 'ADD_ALL_TASK';
const ADD_TASK = 'ADD_TASK';
const ADD_CURRENT_TASK = 'ADD_CURRENT_TASK';
const CHANGE_TASK = 'CHANGE_TASK';
const REMOVE_TASK = 'REMOVE_TASK';

export type StateType = {
  tasks: ITask[];
  isAddTask: boolean;
  currentTask?: ITask;
  filteredData?: FilteredType;
};

const initialState: StateType = {
  tasks: [],
  isAddTask: false,
};

export type ActionStateType = AddAllTaskType | AddTaskType | AddCurrentTaskType | ChangeTaskType | RemoveTaskType;

type AddAllTaskType = {
  type: typeof ADD_ALL_TASK;
  action: ITask[];
};

type AddTaskType = {
  type: typeof ADD_TASK;
  action: ITask;
};

type AddCurrentTaskType = {
  type: typeof ADD_CURRENT_TASK;
  action: ITask;
};

type ChangeTaskType = {
  type: typeof CHANGE_TASK;
  action: ITask;
};

type RemoveTaskType = {
  type: typeof REMOVE_TASK;
  action: number;
};

const todoSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addAllTask(state, action: PayloadAction<ITask[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<ITask>) {
      state.tasks.push(action.payload);
    },
    addCurrentTask(state, action: PayloadAction<boolean>) {
      state.isAddTask = action.payload;
    },
    editCurrentTask(state, action: PayloadAction<ITask | undefined>) {
      state.currentTask = action.payload;
    },
    editTask(state, action: PayloadAction<ITask>) {
      const currentIndex: number = state.tasks.findIndex((task: ITask) => task.id === action.payload.id);

      state.tasks[currentIndex] = action.payload;
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((el) => action.payload !== el.id);
    },
  },
});

export const { addAllTask, addTask, addCurrentTask, editCurrentTask, editTask, deleteTask } = todoSlice.actions;

export default todoSlice.reducer;
