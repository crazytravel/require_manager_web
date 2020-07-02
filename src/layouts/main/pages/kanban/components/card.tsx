import React, { ProviderProps } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableStateSnapshot, DraggableProvided } from "react-beautiful-dnd";
import styled from 'styled-components';
import { Task } from 'models/kanban';



export interface DragItem {
    type: 'card' | 'box',
    task: Task,
    cardHeight: number | undefined,
}

interface CardProps {
    id: string,
    index: number,
    task: string,
}

const Card: React.FC<CardProps> = ({
    id,
    index,
    task,
}) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <Wrapper ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Content>{task}</Content>
                </Wrapper>
            )}
        </Draggable>
    )
}

interface WrapperProps {
    isDragging: boolean
}

const Wrapper = styled.div<WrapperProps>`
    overflow: hidden;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    margin-bottom: 10px;
    background-color: ${props => props.isDragging ? '#AED581' : '#fff'};
    padding: 10px;
`;

const Content = styled.span`
    white-space: normal;
    word-wrap:break-word;
    word-break:break-all; 
`;

export default Card;