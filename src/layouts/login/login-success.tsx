import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSession } from '../../contexts/session-context';
import Axios from 'axios';
import HttpStatus from 'http-status-codes';
import styles from './login-success.module.css';
import LoginHeader from './components/login-header';

const LoginSuccessLayout: React.FC = props => {

    const { login } = useSession();
    const history = useHistory();

    useEffect(() => {
        Axios.get('/auth/profile')
            .then(res => {
                if (res.status === HttpStatus.OK) {
                    console.log(res.data);
                    login(res.data);
                }
            })
            .catch(err => {
                message.error('Occur an error, cannot get your profile!')
                // history.push('/login');
            });

    }, [login, history])

    return (
        <div className={styles.container}>
            <LoginHeader />
            <div className={styles.wrapper}>
                <h1>Login Success and Redirecting...</h1>
                <span className={styles.loading}><LoadingOutlined /></span>
            </div>
        </div>
    );
}

export default LoginSuccessLayout;