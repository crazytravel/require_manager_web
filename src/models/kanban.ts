export interface Project {
    id: string;
    code: string;
    name: string;
    description: string;
    ownerUserId: string;
    active: boolean;
}

export interface Task {
    id: string;
    code: string;
    content: string;
    stageId?: string;
    projectId?: string;
    nextId?: string;
    userId?: string;
}

export interface Stage {
    id: string;
    name: string;
    projectId: string;
    nextId?: string;
}

export interface TaskMap {
    [key: string]: Task;
}

export interface StageMap {
    [key: string]: Stage;
}
