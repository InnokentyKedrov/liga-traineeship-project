import { paths } from 'src/types/api';

export interface ITask {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
  id: number;
}

export type GetTaskByIdRequestType = paths['/tasks/{taskId}']['get']['parameters']['path']['taskId'];
export type GetTaskByIdResponseType =
  paths['/tasks/{taskId}']['get']['responses']['200']['content']['application/json'];

export type DeleteTaskByIdRequestType = paths['/tasks/{taskId}']['delete']['parameters']['path']['taskId'];
export type DeleteTaskByIdResponseType =
  paths['/tasks/{taskId}']['delete']['responses']['200']['content']['application/json; charset=utf-8'];

export type PatchTaskByIdRequestType = paths['/tasks/{taskId}']['patch']['parameters']['path']['taskId'];
export type PatchTaskByIdRequestWithBodyType = Required<
  paths['/tasks/{taskId}']['patch']
>['requestBody']['content']['application/json'];
export type PatchTaskByIdResponseType =
  paths['/tasks/{taskId}']['patch']['responses']['200']['content']['application/json'];

export type GetAllTasksRequestType = paths['/tasks']['get']['parameters']['query'];
export type GetAllTasksResponseType = paths['/tasks']['get']['responses']['200']['content']['application/json'];

export type PostTaskRequestType = Required<paths['/tasks']['post']>['requestBody']['content']['application/json'];
export type PostTaskResponseType = Required<paths['/tasks']['post']>['requestBody']['content']['application/json'];
