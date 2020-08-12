import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Card, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import HttpStatus from 'http-status-codes';
import Axios from 'common/network';
import { User } from 'models/user';
import { useFetch } from 'common/fetch-hook';
import { useSession } from 'common/session-context';
const { Search } = Input;

const { confirm } = Modal;

const UserForm: React.FC = (props) => {
    const { session } = useSession();
    const [form] = Form.useForm();
    useEffect(() => {
        Axios.get(`/api/v1/users/${session.id}`)
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    console.log(res.data);
                    form.setFieldsValue(res.data);
                }
            })
            .catch((err) => message.error('获取用户数据失败'));
    }, [session.id]);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '请输入${label}!',
        types: {
            email: '${label}格式不匹配!',
            number: '${label} is not a validate number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                confirm({
                    title: '确认修改？',
                    icon: <ExclamationCircleOutlined />,
                    okText: '确认',
                    okType: 'primary',
                    cancelText: '取消',
                    onOk() {
                        saveUser(values);
                    },
                });
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const saveUser = (values: any) => {
        Axios.post('/api/v1/users/', { ...values })
            .then((res) => {
                if (res.status === HttpStatus.CREATED) {
                    message.success('操作成功');
                }
            })
            .catch((err) => message.error(err.message));
    };

    return (
        <Card title="个人信息">
            <StyledForm
                {...layout}
                name="nest-messages"
                form={form}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="nickname"
                    label="昵称"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[{ type: 'email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="电话">
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </StyledForm>
        </Card>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
`;
const StyledForm = styled(Form)`
    max-width: 500px;
`;
export default UserForm;
