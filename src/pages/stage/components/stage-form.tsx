import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import Axios from 'common/network';
import { Stage } from 'models/kanban';
import HttpStatus from 'http-status-codes';

interface StageFormProps {
    visible: boolean;
    onSave: (values: any) => void;
    onCancel: () => void;
    projectId: string | null;
    data?: Stage;
}

const StageForm: React.FC<StageFormProps> = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ ...props.data });
    }, [form, props.data]);

    const saveData = (values: any) => {
        if (props.data?.id) {
            Axios.patch('/api/v1/stages/' + props.data?.id, { ...values })
                .then((res) => {
                    if (res.status === HttpStatus.OK) {
                        props.onSave(res.data);
                    }
                })
                .catch((err) => {
                    message.error('修改失败! : ', err.message);
                });
        } else {
            Axios.post('/api/v1/stages', {
                ...values,
                projectId: props.projectId,
            })
                .then((res) => {
                    if (res.status === HttpStatus.CREATED) {
                        props.onSave(res.data);
                    }
                })
                .catch((err) => {
                    message.error('创建失败! : ', err.message);
                });
        }
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
            >
                <Form.Item
                    name="name"
                    label="阶段名称"
                    rules={[{ required: true, message: '请输入阶段名称' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default StageForm;
