import { AxiosError, AxiosResponse } from 'axios';
import { AppDispatch } from 'src/redux/store';
import { addAllTask, addTask, deleteTask, editCurrentTask, editTask } from 'src/redux/slices/taskSlice';
import { setLoader, unsetLoader } from 'src/redux/slices/loadingSlice';
import { setError } from 'src/redux/slices/errorSlice';
import {
  DeleteTaskByIdRequestType,
  GetAllTasksRequestType,
  GetAllTasksResponseType,
  GetTaskByIdRequestType,
  GetTaskByIdResponseType,
  PatchTaskByIdRequestType,
  PatchTaskByIdRequestWithBodyType,
  PatchTaskByIdResponseType,
  PostTaskResponseType,
} from 'src/types/types';
import TaskService from 'src/api/taskApi';

export const getAllTasksThunk = (filteredData: GetAllTasksRequestType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader());

    const response: AxiosResponse<GetAllTasksResponseType> = await TaskService.getAllTasksAxios(filteredData);

    dispatch(addAllTask(response.data));
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error) {
      dispatch(setError(error.message));
    }
  } finally {
    dispatch(unsetLoader());
  }
};

export const getTaskByIdThunk = (taskId: GetTaskByIdRequestType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader());

    const response: AxiosResponse<GetTaskByIdResponseType> = await TaskService.getTaskByIdAxios(taskId);

    dispatch(editCurrentTask(response.data));
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error) {
      dispatch(setError(error.message));
    }
  } finally {
    dispatch(unsetLoader());
  }
};

export const addTasksThunk = (taskData: PostTaskResponseType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader());

    const response: AxiosResponse<PostTaskResponseType> = await TaskService.addTaskAxios(taskData);

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
  (taskId: PatchTaskByIdRequestType, taskData: PatchTaskByIdRequestWithBodyType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoader());

      const response: AxiosResponse<PatchTaskByIdResponseType> = await TaskService.editTaskAxios(taskId, taskData);

      dispatch(editTask(response.data));
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(unsetLoader());
    }
  };

export const deleteTasksThunk = (taskId: DeleteTaskByIdRequestType) => async (dispatch: AppDispatch) => {
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
