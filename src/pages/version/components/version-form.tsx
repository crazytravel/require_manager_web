import React from 'react';
import { Modal, Form, Input, Radio, Checkbox, message } from 'antd';
import { VersionData } from '../../../models/version';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Axios from 'axios';
import HttpStatus from 'http-status-codes';

const { confirm } = Modal;

const { TextArea } = Input;

interface VersionFormProps {
    visible: boolean;
    onSave: (values: any) => void;
    onCancel: () => void;
    data?: VersionData;
}

const VersionForm: React.FC<VersionFormProps> = props => {

    const [form] = Form.useForm();


    const saveData = (values: any) => {
        console.log(values)
        Axios.post("/api/v1/versions", { ...values })
            .then(res => {
                if (res.status === HttpStatus.CREATED) {
                    props.onSave(res.data);
                }
            })
            .catch(err => message.error(err.message));
    }

    const okHandler = () => {
        form.validateFields()
            .then(values => {
                confirm({
                    title: 'Are you sure post this version?',
                    icon: <ExclamationCircleOutlined />,
                    okText: 'Yes',
                    okType: 'primary',
                    cancelText: 'No',
                    onOk() { saveData(values); },
                })
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <Modal
            visible={props.visible}
            title="Post a new version"
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
                <Form.Item name="version" label="Version"
                    rules={[{ required: true, message: 'Please input the version!' }]}>
                    <Input placeholder="x.x.x" />
                </Form.Item>
                <Form.Item name="applicationId" label="applicationId"
                    rules={[{ required: true, message: 'Please input the applicationId!' }]}>
                    <Radio.Group>
                        <Radio value="oneapp">OneApp</Radio>
                        <Radio value="mbapp">MBApp</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="system" label="System"
                    rules={[{ required: true, message: 'Please input the system!' }]}>
                    <Radio.Group>
                        <Radio value="ios">iOS</Radio>
                        <Radio value="android">Android</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="updateTitle" label="Update Title"
                    rules={[{ required: true, message: 'Please input the Title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="updateContent" label="Update Content"
                    rules={[{ required: true, message: 'Please input the Content!' }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="downloadUrl" label="Download URL"
                    rules={[{ required: true, message: 'Please input the downloadUrl!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="appStoreId" label="App Store ID"
                    rules={[{ required: true, message: 'Please input the appStoreId!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="versionCode" label="Version Code">
                    <Input placeholder="for android" type="number" />
                </Form.Item>
                <Form.Item name="mandatory" label="Mandatory" valuePropName="checked">
                    <Checkbox />
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default VersionForm;