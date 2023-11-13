export interface ITask {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
  id: number;
}

export type FilteredType = {
  isImportant?: boolean;
  name_like: string;
};
