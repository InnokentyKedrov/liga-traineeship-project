import { AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { ActionType, StateType, addAllTask, addTask, setLoader, unsetLoader } from './taskSlice';
import { AppDispatch } from './store';
import { ITask } from 'src/types/types';
import TaskService from 'src/api/taskApi';

// export const getAllTasksThunk =
//   (): ThunkAction<Promise<void>, StateType, unknown, ActionType> => async (dispatch: AppDispatch) => {
//     const response: AxiosResponse<ITask[]> = await TaskService.getAllTasks();

//     dispatch(addAllTask(response.data));
//   };

export const getAllTasksThunk = (): any => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoader());

    const response: AxiosResponse<ITask[]> = await TaskService.getAllTasksAxios();

    dispatch(addAllTask(response.data));
  } catch (error) {
    console.warn(error);
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
      console.warn(error);
    } finally {
      dispatch(unsetLoader());
    }
  };
