import { USER_TYPE } from "./user.types";


export interface PROJECT_TYPE {
    projectId: number;
    projectName: string;
    projectDescription: string;
    createdAt: string | null;
    createdBy: USER_TYPE;
    participants: USER_TYPE[];
    isClosed: boolean;
    closedAt: string | null;
}