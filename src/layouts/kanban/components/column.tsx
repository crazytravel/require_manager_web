import React from 'react';
import { Button } from 'antd';
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
import { Task } from 'models/kanban';
import Card from './card';


interface ColumnProps {
    id: string,
    index: number,
    title: string,
    tasks: Task[],
}


const Column: React.FC<ColumnProps> = ({
    id, index, title, tasks
}) => {
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
                <Button type="text" style={{ width: '100%', height: 40 }}>+ 添加新任务</Button>
            </Bottom>
        </Container>
    );
}

const defaultBackgroundColor = '#ebecf0';


const Container = styled.div`
    display: inline-block;
    vertical-align: top;
    background-color: ${defaultBackgroundColor};
    margin: 0 10px;
    border-radius: 3;
    overflow: hidden;
    width: 280px;
    border-radius: 3px;
`;

const Header = styled.div`
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
    flex: 1 1 auto;
    padding: 8px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: background-color .2s ease;
    background-color: ${props => props.isDraggingOver ? '#BBDEFB' : defaultBackgroundColor};
    min-height: 100px;
`;

const Bottom = styled.div`
    text-align: center;
`;

export default Column;