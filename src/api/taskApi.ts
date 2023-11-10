import axios from 'axios';
import URI_API from 'constants/api';
import { FilteredType, ITask } from 'src/types/types';

const getAllTasksAxios = async (filteredData?: FilteredType) => {
  const response = await axios.get(URI_API, { params: filteredData });
  return response;
};

const addTaskAxios = async (taskData: Omit<ITask, 'isComplited' | 'id'>) => {
  const { name, info, isImportant } = taskData;
  const body = { name, info, isImportant };

  const response = await axios.post(URI_API, body);
  return response;
};

const editTaskAxios = async (taskData: ITask) => {
  const { name, info, isImportant, isCompleted, id } = taskData;
  const body = { name, info, isImportant, isCompleted, id };

  const response = await axios.put(`${URI_API}/${id}`, body);
  return response;
};

const deleteTaskAxios = async (taskId: number) => {
  const respone = await axios.delete(`${URI_API}/${taskId}`);
  return respone;
};

const TaskService = {
  getAllTasksAxios,
  addTaskAxios,
  deleteTaskAxios,
  editTaskAxios,
};

export default TaskService;
