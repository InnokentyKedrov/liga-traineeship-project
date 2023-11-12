import { AxiosError, AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { ActionStateType, StateType, addAllTask, addTask, deleteTask, editTask } from './taskSlice';
import { AppDispatch } from './store';
import { setLoader, unsetLoader } from './loadingSlice';
import { setError } from './errorSlice';
import { FilteredType, ITask } from 'src/types/types';
import TaskService from 'src/api/taskApi';

// export const getAllTasksThunk =
//   (filteredData?: FilteredType | undefined): ThunkAction<Promise<void>, StateType, unknown, ActionStateType> =>
//   async (dispatch: AppDispatch) => {
//     const response: AxiosResponse<ITask[]> = await TaskService.getAllTasks();

//     dispatch(addAllTask(response.data));
//   };

export const getAllTasksThunk =
  (filteredData?: FilteredType | undefined): any =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoader());

      const response: AxiosResponse<ITask[]> = await TaskService.getAllTasksAxios(filteredData);

      dispatch(addAllTask(response.data));
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(unsetLoader());
    }
  };

export const addTasksThunk =
  (taskData: Omit<ITask, 'isComplited' | 'id'>): any =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoader());

      const response: AxiosResponse<ITask> = await TaskService.addTaskAxios(taskData);

      dispatch(addTask(response.data));
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(unsetLoader());
    }
  };

export const editTasksThunk =
  (taskData: ITask): any =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoader());

      const response: AxiosResponse<ITask> = await TaskService.editTaskAxios(taskData);

      dispatch(editTask(response.data));
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(unsetLoader());
    }
  };

export const deleteTasksThunk =
  (taskId: number): any =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoader());

      await TaskService.deleteTaskAxios(taskId);

      dispatch(deleteTask(taskId));
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(unsetLoader());
    }
  };
