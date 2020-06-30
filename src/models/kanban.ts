

export interface Task {
    id: string,
    text: string,
    stageId?: string,
}

export interface Stage {
    id: string,
    text: string,
    taskIds: string[],
}

export interface TaskMap {
    [key: string]: Task
}

export interface StageMap {
    [key: string]: Stage
}