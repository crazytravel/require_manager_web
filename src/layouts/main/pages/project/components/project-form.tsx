import React, { useState } from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Axios from 'config/network';
import { Subsystem } from 'models/subsystem';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import HttpStatus from 'http-status-codes';


const { TextArea } = Input;

interface SubsystemFormProps {
    visible: boolean;
    onSave: (values: any) => void;
    onCancel: () => void;
    data?: Subsystem;
}

const getBase64 = (img: File | Blob | undefined, callback: (url: string | ArrayBuffer | null) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img!);
}

const beforeUpload = (file: Blob) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


const SubsystemForm: React.FC<SubsystemFormProps> = props => {

    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState<string>();
    const [mediaId, setMediaId] = useState<string>();
    const [form] = Form.useForm();

    const saveData = async (values: any) => {
        if (!mediaId) {
            message.error('please upload a picture!');
            return;
        }
        values['media_id'] = mediaId;
        console.log(values)
        const res = await Axios.post("/api/v1/subsystems/", { ...values });
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

    const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setLoading(false);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImgUrl(imageUrl as string);
                setLoading(false);
            });
            console.log("上传结果", info.file.response)
            setMediaId(info.file.response?.id)
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );


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
                <Form.Item name="name" label="项目名称"
                    rules={[{ required: true, message: 'Please input the name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="url" label="项目负责人"
                    rules={[{ required: true, message: 'Please input the url!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="项目简介"
                    rules={[{ required: true, message: 'Please input the description!' }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="media_id" label="封面图">
                    <Upload
                        name="file"
                        accept="image/*"
                        listType="picture-card"
                        action="/admin/storage/api/v1/files/upload?featureName=VEDA&publicAccess=true"
                        multiple={true}
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default SubsystemForm;
