import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'common/network';
import { Project } from 'models/kanban';
import HttpStatus from 'http-status-codes';
import { useSession } from 'common/session-context';

const { TextArea } = Input;

interface ProjectFormProps {
    visible: boolean;
    onSave: (values: any) => void;
    onCancel: () => void;
    data?: Project;
}

const ProjectForm: React.FC<ProjectFormProps> = (props) => {
    const { session } = useSession();
    const [form] = Form.useForm();

    const saveData = (values: any) => {
        console.log(values);
        Axios.post('/api/v1/projects/', { ...values, ownerUserId: session.id })
            .then((res) => {
                if (res.status === HttpStatus.CREATED) {
                    props.onSave(res.data);
                }
            })
            .catch((err) => {
                message.error('创建项目失败! error: ', err.message);
            });
    };

    const okHandler = () => {
        form.validateFields()
            .then((values) => {
                saveData(values);
            })
            .catch((err) => {
                message.error(err);
            });
    };

    return (
        <Modal
            visible={props.visible}
            title="创建项目"
            okText="保存"
            cancelText="取消"
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
                <Form.Item
                    name="code"
                    label="项目编号"
                    rules={[{ required: true, message: '请输入项目编号' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="项目名称"
                    rules={[{ required: true, message: '请输入项目名称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="项目简介"
                    rules={[{ required: true, message: '请输入项目简介' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProjectForm;
