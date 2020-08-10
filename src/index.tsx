import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RootRoutes } from 'common/routes';
import SessionContextProvider from 'common/session-context';
import './index.less';
// import * as serviceWorker from './serviceWorker';

const App: React.FC = () => {
    const baseURL = process.env.PUBLIC_URL;
    return (
        <SessionContextProvider>
            <BrowserRouter basename={baseURL}>
                <RootRoutes />
            </BrowserRouter>
        </SessionContextProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
