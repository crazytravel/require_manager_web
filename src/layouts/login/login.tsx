import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Form, Input, Checkbox, message } from 'antd';
import styles from './login.module.css';
import Axios from '../../config/network';
import HttpStatus from 'http-status-codes';
import { useSession } from '../../contexts/session-context';
import { Session } from '../../models/user';



const LoginLayout: React.FC = props => {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { login, session } = useSession();
    const history = useHistory();

    useEffect(() => {
        if (session.logged_in) {
            history.push('/');
        }
    }, [history, session]);

    const onFinish = () => {
        setLoading(true);
        form.validateFields()
            .then(values => {
                Axios.post("/api/auth/token", { ...values })
                    .then(res => {
                        if (res.status === HttpStatus.OK) {
                            getUserInfo();
                        }
                    })
                    .catch(err => message.error(err.message));
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
        setLoading(false);
    }

    const getUserInfo = () => {
        Axios.get("/api/auth/user-info")
            .then(res => {
                if (res.status === HttpStatus.OK) {
                    const newSession: Session = {...res.data, logged_in: true, authorities: res.data.permissions};
                    login(newSession);
                }
            })
            .catch(err => message.error(err.message));

    }

    return (
        <div className={styles.container}>
            <div className={styles['content-wrapper']}>
                <h1 className={styles.title}>需求管理系统</h1>
                <p className={styles['sub-title']}>本系统可以管理软件开发中的需求</p>
                <Card title="登陆" bordered={false} headStyle={{ width: 350, textAlign: "center" }} >
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        form={form}
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item name="username" label="用户名"
                            rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="密码"
                            rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 6, span: 18 }}
                            name="remember" valuePropName="checked">
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center" }}>
                            <Button className={styles['login-form-button']} type="primary" loading={loading} htmlType="submit">
                                登陆
                                </Button>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default LoginLayout;