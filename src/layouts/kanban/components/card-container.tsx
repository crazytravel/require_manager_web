import React from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createUseStyles } from 'react-jss';


interface CardContainerProps {
    title: string
}

const CardContainer: React.FC<CardContainerProps> = props => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <h3>{props.title}</h3>
                <div>...</div>
            </div>

            <DndProvider backend={HTML5Backend}>
                {props.children}
            </DndProvider>
        </div>
    );
}

const useStyles = createUseStyles({
    container: {
        backgroundColor: '#eaecf0',
        margin: '0 10px',
        padding: 10,
        borderRadius: 3,
        overflowX: 'auto'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: 5,
        '& h3': {
            color: 'rgba(0, 0, 0, 0.65)',
        },
        '& div': {
            padding: '0 10px',
            borderRadius: 2,
            '&:hover': {
                background: 'rgba(0, 0, 0, .2)'
            }
        },
    }
});

export default CardContainer;