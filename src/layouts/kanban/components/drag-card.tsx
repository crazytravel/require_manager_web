import React from 'react';
import { Card, Row, Col, Tooltip } from 'antd';
import { useDrag } from 'react-dnd';
import { createUseStyles } from 'react-jss';
import devopsImg from 'assets/images/cover-devops.jpg';

const { Meta } = Card;


const DragCard: React.FC = props => {
    const classes = useStyles();
    const [{ opacity }, dragRef] = useDrag({
        item: { type: 'card' },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });
    return (
        <div ref={dragRef} style={{ marginTop: 10, marginBottom: 10, opacity }}>
            <Card
                hoverable
                bordered={false}
                style={{ width: 250, textAlign: 'center', overflow: 'hidden' }}
                cover={
                    <img style={{ height: 100, objectFit: "cover" }} src={ devopsImg } alt="DevOps" />
                }
            >
                <Meta title="DevOps Portal" className={classes.cardContent} />
            </Card>
        </div>

    )
}

const useStyles = createUseStyles({
    cardContent: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

export default DragCard;