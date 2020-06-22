import React, { useState } from 'react'
import { Button } from 'antd';
import { useDrop } from 'react-dnd'
import styled from 'styled-components';
import { DragItem } from './drag-card';
import { useStage } from './stage-context';


interface CardContainerProps {
    id: string,
    title: string,
}


const CardContainer: React.FC<CardContainerProps> = props => {
    const { stages, setStages } = useStage();
    const [height, setHeight] = useState<number>();
    const [hasDropped, setHasDropped] = useState(false);
    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: 'card',
        drop(item: DragItem, monitor) {
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return
            }
            if (item.task.stageId === props.id) {
                return;
            }
            setHasDropped(true);
            const new_stage = stages.map(stage => {
                if (stage.id === props.id) {
                    stage.tasks.push(item.task);
                }
                if (stage.id === item.task.stageId) {
                    stage.tasks = stage.tasks.filter(task => task.id !== item.task.id);
                }
                return stage;
            });
            setStages(new_stage);
            setHeight(item.cardHeight);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    });
    let backgroundColor = '';

    if (isOverCurrent || (isOver)) {
        backgroundColor = 'rgba(0, 0, 0, .1)'
    }
    return (
        <Container ref={drop} >
            <Header>
                <HeaderTitle>{props.title}</HeaderTitle>
                <HeaderBtn>...</HeaderBtn>
            </Header>
            <Content style={{ backgroundColor }} >
                {props.children}
            </Content>
            <Bottom>
                <Button type="text" style={{ width: '100%', height: 40 }}>+ 添加新任务</Button>
            </Bottom>
        </Container>
    );
}


const Container = styled.div`
    display: inline-block;
    vertical-align: top;
    background-color: #ebecf0;
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

const HeaderTitle = styled.h3`
    color: rgba(0, 0, 0, 0.65);
`;

const HeaderBtn = styled.div`
    padding: 0 10px;
    border-radius: 2;
    &:hover {
        background-color: rgba(0, 0, 0, .2);
    }
`;

const Content = styled.div`
    flex: 1 1 auto;
    padding: 0 10px;
    overflow-x: hidden;
    overflow-y: auto;
`;

const Bottom = styled.div`
    text-align: center;
`;

export default CardContainer;