import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'common/network';
import { Role } from 'models/role';
import HttpStatus from 'http-status-codes';


const { TextArea } = Input;

interface RoleFormProps {
    id?: number;
    visible: boolean;
    onSave: (values: any) => void;
    onCancel: () => void;
    data?: Role;
}

const RoleForm: React.FC<RoleFormProps> = props => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (props.id) {
            Axios.get('/api/v1/roles/' + props.id)
                .then(res => {
                    if (res.status === HttpStatus.OK) {
                        form.setFieldsValue(res.data)
                        console.log(res.data);
                    }
                }).catch(err => {
                    console.error('error message: ', err);
                    message.error(err.message);
                })
        }
    }, [props.id, form]);
    const saveData = async (values: any) => {
        console.log(values)
        if (values.id) {
            const res = await Axios.put('/api/v1/roles/' + values.id, { ...values });
            if (res.status === HttpStatus.CREATED) {
                props.onSave(res.data);
            } else {
                message.error("save data failed, reason:" + res?.data?.error?.name);
            }
            return;
        }
        const res = await Axios.post("/api/v1/roles/", { ...values });
        if (res.status === HttpStatus.CREATED) {
            props.onSave(res.data);
        } else {
            console.error(res);
            message.error("save data failed, reason:" + res?.data?.errors?.name);
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
            title="Create a new Role"
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
        </Modal>
    )
}

export default RoleForm;
