import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session } from '../models/user';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { message } from 'antd';
import HttpStatus from 'http-status-codes';

const initialSession = () => {
    const session: Session = {
        username: '',
        nickname: '',
        email: '',
        phone: '',
        roles: [],
    }
    return session;
};

const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession(), () => { }]);

export const useSession = () => {
    const [session, setSession] = useContext(SessionContext);
    const history = useHistory();
    const login = (session: Session) => {
        setSession(session);
        history.push('/');
    }
    const logout = () => {
        setSession(initialSession());
        Axios.post('/auth/logout')
            .then(res => {
                if (res.status === HttpStatus.CREATED) {
                    window.location = res.data['redirectUrl'];
                    // session.logoutUrl = res.data['redirectUrl'];
                    // setSession(session);
                    // history.push('/login');
                } else {
                    message.error('logout failed.');
                }
            }).catch(err => {
                message.error('logout failed, error: ', err.message);
            });
    }
    return { login, logout, session };
}


const SessionContextProvider: React.FC = props => {

    let prevSession = initialSession();
    prevSession.username = localStorage.getItem('username') || '';
    prevSession.nickname = localStorage.getItem('nick_name') || '';
    prevSession.roles = localStorage.getItem('authorities')?.split(',') || [];
    const [session, setSession] = useState(prevSession);
    useEffect(
        () => {
            localStorage.setItem('username', session.username);
            localStorage.setItem('nick_name', session.nickname || '');
            localStorage.setItem('authorities', session.authorities ? session.authorities!.join(',') : '');
        },
        [session]
    );

    return (
        <SessionContext.Provider value={[session, setSession]}>
            {props.children}
        </SessionContext.Provider>
    );
}

export default SessionContextProvider;