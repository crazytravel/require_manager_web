import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components';


interface CardContainerProps {
    title: string
}


const CardContainer: React.FC<CardContainerProps> = props => {

    const [hasDropped, setHasDropped] = useState(false);
    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: 'card',
        drop(item, monitor) {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return
            }
            setHasDropped(true)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    });
    let backgroundColor = 'rgba(0, 0, 0, .5)'

    if (isOverCurrent || (isOver)) {
        backgroundColor = 'darkgreen'
    }
    return (
        <Container>
            <Header>
                <HeaderTitle>{props.title}</HeaderTitle>
                <HeaderBtn>...</HeaderBtn>
            </Header>
            <DropContainer ref={drop} style={{ backgroundColor }} >
                {props.children}
                {hasDropped && <span>dropped</span>}
            </DropContainer>
        </Container>
    );
}


const Container = styled.div`
    background-color: #eaecf0;
    margin: 0 10px;
    padding: 10;
    border-radius: 3;
    overflow-x: auto;
`;

const Header = styled.div`
    display: flex;
        flex-direction: row;
        justify-content: space-between;
        cursor: pointer;
        padding: 5px;
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

const DropContainer = styled.div`

`;

export default CardContainer;