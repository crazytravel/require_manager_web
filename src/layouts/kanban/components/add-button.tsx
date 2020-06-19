import React from 'react'
import { createUseStyles } from 'react-jss';


interface AddButtonProps {
    text: string
}

const AddButton: React.FC<AddButtonProps> = props => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>{props.text}</div>
    );
}

const useStyles = createUseStyles({
    wrapper: {
        backgroundColor: '#eaecf0',
        width: 200,
        height: 50,
        padding: 5,
        borderRadius: 3,
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '1.5rem',
        margin: '0 10px',
    },
});

export default AddButton;