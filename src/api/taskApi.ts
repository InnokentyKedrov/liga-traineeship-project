import axios from 'axios';
import URI_API from 'src/constants/api';
import {
  DeleteTaskByIdRequestType,
  GetAllTasksRequestType,
  GetTaskByIdRequestType,
  PatchTaskByIdRequestType,
  PatchTaskByIdRequestWithBodyType,
  PostTaskRequestType,
} from 'src/types/types';

const getAllTasksAxios = async (filteredData: GetAllTasksRequestType) => {
  const response = await axios.get(URI_API, { params: filteredData });
  return response;
};

const getTaskByIdAxios = async (taskId: GetTaskByIdRequestType) => {
  const response = await axios.get(`${URI_API}/${taskId}`);
  return response;
};

const addTaskAxios = async (taskData: PostTaskRequestType) => {
  const response = await axios.post(URI_API, taskData);
  return response;
};

const editTaskAxios = async (taskId: PatchTaskByIdRequestType, taskData: PatchTaskByIdRequestWithBodyType) => {
  const response = await axios.patch(`${URI_API}/${taskId}`, taskData);
  return response;
};

const deleteTaskAxios = async (taskId: DeleteTaskByIdRequestType) => {
  const respone = await axios.delete(`${URI_API}/${taskId}`);
  return respone;
};

const TaskService = {
  getAllTasksAxios,
  getTaskByIdAxios,
  addTaskAxios,
  deleteTaskAxios,
  editTaskAxios,
};

export default TaskService;
