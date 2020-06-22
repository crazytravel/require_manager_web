

export interface Task {
    id: string,
    text: string,
    stageId: string,
}

export interface Stage {
    id: string,
    text: string,
    tasks: Task[],
}