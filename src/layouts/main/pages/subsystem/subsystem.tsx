import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Axios from 'config/network';
import { useFetch } from 'hooks/fetch';
import { Subsystem } from 'models/subsystem';
import styles from './subsystem.module.css';
import StorageImg from 'components/storage-img';
import SubSystemForm from './components/subsystem-form';
import HttpStatus from 'http-status-codes';

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
        <div className={styles.container}>
            <div className={styles['condition-wrapper']}>
                <Button type="primary" onClick={() => setFormVisible(true)}>Create New subsystem</Button>
            </div>
            <Table
                columns={[
                    { title: '#', key: 'number', render: (text, record, index) => index + 1 },
                    { title: 'name', key: 'name', dataIndex: 'name' },
                    { title: 'description', key: 'description', dataIndex: 'description' },
                    { title: 'url', key: 'url', dataIndex: 'url' },
                    {
                        title: 'cover image', key: 'media_id', dataIndex: 'media_id',
                        render: (text, record) => <StorageImg mediaId={record.media_id} style={{ height: 50 }} />
                    }, {
                        title: 'Action', key: 'action',
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