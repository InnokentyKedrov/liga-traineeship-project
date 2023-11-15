import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeleteTaskByIdResponseType,
  GetAllTasksResponseType,
  GetTaskByIdResponseType,
  PatchTaskByIdRequestWithBodyType,
  PatchTaskByIdResponseType,
} from 'src/types/types';

export type StateType = {
  tasks: GetAllTasksResponseType;
  isAddTask: boolean;
  currentTask?: GetTaskByIdResponseType;
  filteredData?: PatchTaskByIdRequestWithBodyType;
};

const initialState: StateType = {
  tasks: [],
  isAddTask: false,
};

const todoSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addAllTask(state, action: PayloadAction<GetAllTasksResponseType>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<GetTaskByIdResponseType>) {
      state.tasks.push(action.payload);
    },
    addCurrentTask(state, action: PayloadAction<boolean>) {
      state.isAddTask = action.payload;
    },
    editCurrentTask(state, action: PayloadAction<GetTaskByIdResponseType | undefined>) {
      state.currentTask = action.payload;
    },
    editTask(state, action: PayloadAction<PatchTaskByIdResponseType>) {
      const currentIndex: number = state.tasks.findIndex(
        (task: PatchTaskByIdResponseType) => task.id === action.payload.id
      );

      state.tasks[currentIndex] = action.payload;
    },
    deleteTask(state, action: PayloadAction<DeleteTaskByIdResponseType>) {
      state.tasks = state.tasks.filter((el) => Number(action.payload) !== el.id);
    },
  },
});

export const { addAllTask, addTask, addCurrentTask, editCurrentTask, editTask, deleteTask } = todoSlice.actions;

export default todoSlice.reducer;
