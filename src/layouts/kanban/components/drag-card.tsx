import React from 'react';
import { Card } from 'antd';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import devopsImg from 'assets/images/cover-devops.jpg';

const { Meta } = Card;


const DragCard: React.FC = props => {
    const [{ opacity }, dragRef] = useDrag({
        item: { type: 'card' },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });
    return (
        <Wrapper ref={dragRef} opacity={opacity}>
            <StyledCard
                hoverable
                bordered={false}
                cover={
                    <StyledImg src={devopsImg} alt="DevOps" />
                }
            >
                <StyledMeta title="DevOps Portal" />
            </StyledCard>
        </Wrapper>

    )
}

interface WrapperProps {
    readonly opacity: number;
}

const Wrapper = styled.div<WrapperProps>`
    margin: 10px 0;
    opacity: ${props => props.opacity};
`;

const StyledCard = styled(Card)`
    width: 250px;
    text-align: center;
    overflow: hidden;
`;

const StyledImg = styled.img`
    height: 100px; 
    object-fit: cover;
`;

const StyledMeta = styled(Meta)`
    overflow: hidden;
    text-overflow: ellipsis;
`;

export default DragCard;