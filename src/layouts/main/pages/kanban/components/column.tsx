import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    DraggableProvided,
    DraggableStateSnapshot,
    DroppableProvided,
    DroppableStateSnapshot
} from "react-beautiful-dnd";
import styled from 'styled-components';
import HttpStatus from 'http-status-codes';
import { Task } from 'models/kanban';
import Card from './card';
import axios from 'config/network';

const { TextArea } = Input;

interface ColumnProps {
    id: string,
    index: number,
    title: string,
    tasks: Task[],
    projectId: string,
}


const Column: React.FC<ColumnProps> = ({
    id, index, title, tasks, projectId
}) => {
    const [isCreating, setIsCreating] = useState(false);
    const [taskText, setTaskText] = useState<string>();
    const handleOnConfirmCreateTask = () => {
        setIsCreating(false);
        if (!taskText) {
            return;
        }
        axios.post("/api/v1/tasks", { content: taskText, projectId, stageId: id })
            .then(res => {
                if (res.status !== HttpStatus.CREATED) {
                    setTaskText('');
                }
            })
            .catch(err => {
                message.error("save data failed, reason:" + err);
            });
    }

    return (
        <Container>
            <Header><Title>{title}</Title><HeaderBtn>...</HeaderBtn></Header>
            <Droppable droppableId={id}>
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <Content ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}>
                        {tasks.map((task: Task, index: number) =>
                            <Card id={task.id} task={task.text} index={index} key={task.id} />)}
                        {provided.placeholder}
                    </Content>
                )}
            </Droppable>
            <Bottom>
                {isCreating ? <TextArea autoSize={{ minRows: 2 }} onInput={(e) => setTaskText(e.currentTarget.value)} value={taskText} />
                    : <Button type="text" onClick={() => setIsCreating(true)} style={{ width: '100%', height: 40 }}>+ 添加新任务</Button>}
            </Bottom>
            {isCreating ?
                <ButtonWrapper>
                    <Button type="default" onClick={() => setIsCreating(false)}>取消</Button>
                    <Button type="primary" onClick={handleOnConfirmCreateTask} style={{ marginLeft: 5 }}>确定</Button>
                </ButtonWrapper> : ''
            }
        </Container >
    );
}

const defaultBackgroundColor = '#ebecf0';


const Container = styled.div`
    vertical-align: top;
    margin: 0 10px;
    border-radius: 3;
    overflow: hidden;
    width: 280px;
    border-radius: 3px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    background-color: ${defaultBackgroundColor};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    padding: 6px 5px 0 15px;
`;

const Title = styled.h3`
    color: rgba(0, 0, 0, 0.65);
`;

const HeaderBtn = styled.div`
    padding: 0 10px;
    border-radius: 2;
    &:hover {
        background-color: rgba(0, 0, 0, .2);
    }
`;

interface ContentProps {
    isDraggingOver: boolean,
}

const Content = styled.div<ContentProps>`
    background-color: ${defaultBackgroundColor};
    padding: 8px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: background-color .2s ease;
    background-color: ${props => props.isDraggingOver ? '#BBDEFB' : defaultBackgroundColor};
    min-height: 100px;
`;

const Bottom = styled.div`
    text-align: center;
    background-color: ${defaultBackgroundColor};
`;

const ButtonWrapper = styled.div`
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

export default Column;