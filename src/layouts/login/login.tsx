import React, { useState } from 'react';
import { Button, Card } from 'antd';
import styles from './login.module.css';
import LoginHeader from './components/login-header';



const LoginLayout: React.FC = props => {

    const [loading, setLoading] = useState(false);

    const login = () => {
        setLoading(true);
        window.location.href = process.env.PUBLIC_URL + '/auth/login';
        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <LoginHeader />
            <div className={styles['content-wrapper']}>
                <h1 className={styles.title}>Require Manager</h1>
                <p className={styles['sub-title']}>This is system for manage requirement.</p>
                <Card title="Sign In" bordered={false} style={{ width: 300, textAlign: "center" }} >
                    <div className={styles.wrapper}>
                        <Button className={styles['login-form-button']} type="primary" loading={loading} onClick={() => { login() }}>
                            Sign in
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default LoginLayout;