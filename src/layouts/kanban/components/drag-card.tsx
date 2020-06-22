import React from 'react';
import { Card } from 'antd';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { Task } from 'models/kanban';


export interface DragItem {
    type: 'card' | 'box',
    task: Task,
    cardHeight: number,
}

interface DragCardProps {
    task: Task,
}

const DragCard: React.FC<DragCardProps> = ({
    task,
}) => {
    const [{ opacity, rotate }, dragRef] = useDrag({
        item: { type: 'card', task},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
            rotate: monitor.isDragging() ? 10 : 0,
        })
    });
    return (
        <Wrapper ref={dragRef} opacity={opacity} rotate={rotate} >
            <StyledCard
                hoverable
                bordered={false}
                bodyStyle={{ padding: 10 }}
            >
                <Text>{task.text}</Text>
            </StyledCard>
        </Wrapper>

    )
}

interface WrapperProps {
    readonly opacity: number;
    readonly rotate: number;
}

const Wrapper = styled.div<WrapperProps>`
    opacity: ${props => props.opacity};
    transform: rotate(${props => props.rotate + 'deg'}); 
`;

const StyledCard = styled(Card)`
    overflow: hidden;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    margin: 10px 0;
`;

const Text = styled.span`
    white-space: normal;
    word-wrap:break-word;
    word-break:break-all; 
`;

export default DragCard;