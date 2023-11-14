import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeleteTaskByIdResponseType,
  GetAllTasksResponseType,
  GetTaskByIdResponseType,
  PatchTaskByIdRequestWithBodyType,
  PatchTaskByIdResponseType,
} from '../../types/types';

const ADD_ALL_TASK = 'ADD_ALL_TASK';
const ADD_TASK = 'ADD_TASK';
const ADD_CURRENT_TASK = 'ADD_CURRENT_TASK';
const CHANGE_TASK = 'CHANGE_TASK';
const REMOVE_TASK = 'REMOVE_TASK';

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

// export type ActionStateType = AddAllTaskType | AddTaskType | AddCurrentTaskType | ChangeTaskType | RemoveTaskType;

// type AddAllTaskType = {
//   type: typeof ADD_ALL_TASK;
//   action: ITask[];
// };

// type AddTaskType = {
//   type: typeof ADD_TASK;
//   action: ITask;
// };

// type AddCurrentTaskType = {
//   type: typeof ADD_CURRENT_TASK;
//   action: ITask;
// };

// type ChangeTaskType = {
//   type: typeof CHANGE_TASK;
//   action: ITask;
// };

// type RemoveTaskType = {
//   type: typeof REMOVE_TASK;
//   action: number;
// };

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
