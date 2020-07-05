export interface Project {
    id: string,
    code: string,
    name: string,
    description: string,
    ownerUserId: string,
    active: boolean,
}

export interface Task {
    id: string,
    content: string,
    stageId?: string,
    projectId?: string,
    previousId?: string,
    nextId?: string,
}

export interface Stage {
    id: string,
    name: string,
    previousId?: string,
    nextId?: string,
    taskIds?: string[],
}

export interface TaskMap {
    [key: string]: Task
}

export interface StageMap {
    [key: string]: Stage
}