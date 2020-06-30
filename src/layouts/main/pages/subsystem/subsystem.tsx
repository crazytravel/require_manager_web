import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Axios from 'config/network';
import { useFetch } from 'hooks/fetch';
import { Subsystem } from 'models/subsystem';
import SubSystemForm from './components/subsystem-form';
import HttpStatus from 'http-status-codes';

import {StyledCondition} from '../../components/styled';

const { confirm } = Modal;

const SubsystemPage: React.FC = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [deleteId, setDeleteId] = useState<number>();
    const [createdId, setCreatedId] = useState<number>();
    const { loading, fetchedData } = useFetch<Subsystem[]>('/api/v1/subsystems/', [deleteId, createdId]);

    const saveHandler = (values: Subsystem) => {
        setFormVisible(false);
        setCreatedId(values.id);
        message.success('Save Succeed!');
    }

    const handleDeleteAction = (id: number) => {
        confirm({
            title: 'Are you sure delete this subsystem?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                Axios.delete('/api/v1/subsystems/' + id)
                    .then(res => {
                        if (res.status === HttpStatus.NO_CONTENT) {
                            setDeleteId(id);
                            message.success('delete succeed!');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        message.error(err.message)
                    });
            },
        })
    }
    return (
        <div>
            <StyledCondition>
                <Button type="primary" onClick={() => setFormVisible(true)}>创建新项目</Button>
            </StyledCondition>
            <Table
                columns={[
                    { title: '#', key: 'number', render: (text, record, index) => index + 1 },
                    { title: '项目名称', key: 'name', dataIndex: 'name' },
                    { title: '简单介绍', key: 'description', dataIndex: 'description' },
                    { title: '项目负责人', key: 'description', dataIndex: 'description' },
                    {
                        title: '操作', key: 'action',
                        render: (text, record) => <Button onClick={() => handleDeleteAction(record.id)} type="link">Delete</Button>
                    },
                ]}
                rowKey={record => record.id}
                dataSource={fetchedData}
                pagination={false}
                loading={loading}
            />
            <SubSystemForm visible={formVisible} onCancel={() => setFormVisible(false)} onSave={saveHandler} />
        </div>

    )
}

export default SubsystemPage;