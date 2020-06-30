import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined, LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import Column from './components/column';
import AdminHeader from './components/kanban-header';
import { Task, Stage, TaskMap, StageMap } from 'models/kanban';


const fakeTasks: TaskMap = {
    'task-1': { id: 'task-1', text: '这是内容，麻烦请看一下1' },
    'task-2': { id: 'task-2', text: '这是内容，麻烦请看一下2' },
    'task-3': { id: 'task-3', text: '这是内容，麻烦请看一下3' },
    'task-4': { id: 'task-4', text: '这是内容，麻烦请看一下4' },
    'task-5': { id: 'task-5', text: '这是内容，麻烦请看一下5' },
    'task-6': { id: 'task-6', text: '这是内容，麻烦请看一下6,这是内容，麻烦请看一下6,这是内容，麻烦请看一下6,这是内容，麻烦请看一下6,这是内容，麻烦请看一下6' },
    'task-7': { id: 'task-7', text: '作为一个用户，我能够通过鼠标拖动任务卡，实现任务卡状态的更新。' },
    'task-8': { id: 'task-8', text: '作为一个项目管理者，我可以新建任务列表' },
    'task-9': { id: 'task-9', text: '这是内容，麻烦请看一下6,这是内容，麻烦请看一下6,这是内容，麻烦请看一下6,这是内容，麻烦请看一下6,这是内容，麻烦请看一下6' },
}

const fakeStages: StageMap = {
    'stage-1': {
        id: 'stage-1',
        text: '需求列表',
        taskIds: [ 'task-2', 'task-3', 'task-4', 'task-8'],
    },
    'stage-2': {
        id: 'stage-2',
        text: '代办任务',
        taskIds: ['task-5', 'task-6'],
    },
    'stage-3': {
        id: 'stage-3',
        text: '开发中',
        taskIds: ['task-9'],
    },
    'stage-4': {
        id: 'stage-4',
        text: '测试中',
        taskIds: ['task-7'],
    },
    'stage-5': {
        id: 'stage-5',
        text: '已完成',
        taskIds: [],
    },
    'stage-6': {
        id: 'stage-6',
        text: '已交付',
        taskIds: ['task-1'],
    }
};

const fakeStageOrders = ['stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5', 'stage-6'];

const AdminLayout: React.FC = props => {
    const [stages, setStages] = useState(fakeStages);
    const [tasks, setTasks] = useState(fakeTasks);

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }
        const start = stages[source.droppableId];
        const finish = stages[destination.droppableId];
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newStage = {
                ...start,
                taskIds: newTaskIds,
            };
            setStages({ ...stages, [newStage.id]: newStage });
            return;
        }
        // moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };
        setStages({
            ...stages,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        })
    }
    return (
        <Container>
            <AdminHeader />
            <Subtitle>
                <h3>KANBAN</h3>
                <Link to="/main">
                    <Tooltip placement="bottom" title="Ask for Support">
                        <SettingOutlined style={{ fontSize: '2rem', color: 'rgba(0, 0, 0, 0.65)' }} />
                    </Tooltip>
                </Link>
            </Subtitle>
            <DragDropContext onDragEnd={onDragEnd}>
                <Content>
                    {fakeStageOrders.map((stageId: string, index: number) => {
                        const currentStage = stages[stageId];
                        const currentTasks = currentStage.taskIds.map(taskId => tasks[taskId]);
                        return <Column key={currentStage.id} id={currentStage.id} index={index} title={currentStage.text} tasks={currentTasks} />
                    })}
                </Content>
            </DragDropContext>
        </Container >
    )
}

const Loading = () => {
    return (
        <LoadingContainer>
            <span><LoadingOutlined /></span>
        </LoadingContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Subtitle = styled.div`
    background-color: #fff;
    height: 5rem;
    line-height: 5rem;
    padding: 0 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    z-index: 10;
`;


const Content = styled.div`
    white-space: nowrap;
    height: 100%;
    background-color: #f5f7f9;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    padding: 15px;
`;

const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
        font-size: 5rem;
        color: rgba(0, 0, 0, 0.65);
    }
`;


export default AdminLayout;