import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session } from '../models/user';
import { useHistory } from 'react-router-dom';
import Axios from './network';
import { message } from 'antd';
import HttpStatus from 'http-status-codes';
import { Routes } from './routes';

const initialSession = () => {
    const session: Session = {
        id: '',
        logged_in: false,
        username: '',
        nickname: '',
        email: '',
        phone: '',
        roles: [],
    };
    return session;
};

const SessionContext = createContext<[Session, (session: Session) => void]>([
    initialSession(),
    () => {},
]);

export const useSession = () => {
    const [session, setSession] = useContext(SessionContext);
    const history = useHistory();
    const login = (session: Session) => {
        setSession(session);
        history.push('/');
    };
    const logout = () => {
        Axios.post('/api/auth/logout')
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    setSession(initialSession());
                    history.push(Routes.signIn.path);
                } else {
                    message.error('logout failed.');
                }
            })
            .catch((err) => {
                message.error('logout failed, error: ', err.message);
            });
    };
    return { login, logout, session };
};

const SessionContextProvider: React.FC = (props) => {
    const prevSession = initialSession();
    prevSession.logged_in =
        localStorage.getItem('logged_in') === 'true' || false;
    prevSession.id = localStorage.getItem('id') || '';
    prevSession.username = localStorage.getItem('username') || '';
    prevSession.nickname = localStorage.getItem('nick_name') || '';
    prevSession.authorities =
        localStorage.getItem('authorities')?.split(',') || [];
    const [session, setSession] = useState(prevSession);
    useEffect(() => {
        localStorage.setItem('logged_in', session.logged_in.toString());
        localStorage.setItem('id', session.id);
        localStorage.setItem('username', session.username);
        localStorage.setItem('nick_name', session.nickname || '');
        localStorage.setItem(
            'authorities',
            session.authorities ? session.authorities!.join(',') : '',
        );
    }, [session]);

    return (
        <SessionContext.Provider value={[session, setSession]}>
            {props.children}
        </SessionContext.Provider>
    );
};

export default SessionContextProvider;
