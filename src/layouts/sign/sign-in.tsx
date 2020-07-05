import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Card, Form, Input, Checkbox, message } from 'antd';
import HttpStatus from 'http-status-codes';
import Axios from 'config/network';
import { useSession } from 'contexts/session-context';
import { Session } from 'models/user';
import SignContainer from './components/sign-container';


const SignInLayout: React.FC = props => {

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
                    const newSession: Session = { ...res.data, logged_in: true, authorities: res.data.permissions };
                    login(newSession);
                }
            })
            .catch(err => message.error(err.message));

    }

    return (
        <SignContainer>
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
                        <Button style={{ paddingLeft: 50, paddingRight: 50 }} type="primary" loading={loading} htmlType="submit">
                            登陆
                                </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center" }}>
                        <Link to='/sign-up'>新用户注册</Link>
                    </Form.Item>
                </Form>
            </Card>
        </SignContainer>
    );
}



export default SignInLayout;