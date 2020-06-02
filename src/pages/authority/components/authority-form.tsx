import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'axios';
import { Authority } from '../../../models/authority';
import HttpStatus from 'http-status-codes';


const { TextArea } = Input;

interface AuthorityFormProps {
    visible: boolean;
    onSave: (values: any) => void;
    onCancel: () => void;
    data?: Authority;
}


const AuthorityForm: React.FC<AuthorityFormProps> = props => {

    const [form] = Form.useForm();

    const saveData = async (values: any) => {
        console.log(values)
        const res = await Axios.post("/api/v1/authorities/", { ...values });
        if (res.status === HttpStatus.CREATED) {
            props.onSave(res.data);
        } else {
            console.error(res);
            message.error("save data failed");
        }
    }

    const okHandler = () => {
        form.validateFields()
            .then(values => {
                saveData(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }


    return (
        <Modal
            visible={props.visible}
            title="Create a new Authority"
            okText="Save"
            cancelText="Cancel"
            onCancel={props.onCancel}
            onOk={okHandler}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                form={form}
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item name="name" label="Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description"
                    rules={[{ required: true, message: 'Please input the description!' }]}>
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default AuthorityForm;
