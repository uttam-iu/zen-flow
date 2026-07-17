import { USER_TYPE } from "./user.types";

export interface TaskType {
  taskId: number|string;
  taskTitle: string;
  taskDescription?: string;
  priorityType?: string;
  taskType?: string;
  taskStatus:string;
  columnId: number|string;
  createdAt: string;
  createdBy: USER_TYPE | null;
  updatedAt?: string;
  updatedBy?: USER_TYPE | null;
  assignee?:USER_TYPE[] | [];
  dueDate?: string;
}

export interface ColumnType {
  id: number|string;
  title: string;
}
