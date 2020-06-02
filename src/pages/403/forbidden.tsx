import React from 'react';
import styles from './forbidden.module.css';


const ForbiddenPage: React.FC = props => {

    return (
        <div className={styles.container}>
            <h1>403</h1>
            <h3>
                Forbidden Access
            </h3>
        </div>
    )
}

export default ForbiddenPage;