import React from 'react';
import styles from './no-match.module.css';

interface RouteProps {
    location: { pathname: string }
}

const NoMatchPage: React.FC<RouteProps> = props => {

    return (
        <div className={styles.container}>
            <h1>404</h1>
            <h3>
                Cannot find the page by path: {' '}
                <code>{props.location.pathname}</code>
            </h3>
        </div>
    )
}

export default NoMatchPage;