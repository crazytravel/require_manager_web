import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { useFetch } from 'hooks/fetch';
import { VersionData } from 'models/version';
import Axios from 'config/network';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import HttpStatus from 'http-status-codes';

const { confirm } = Modal;

interface VersionTableProps {
    os: 'ios' | 'android';
    platform: 'oneapp' | 'mbapp';
    onRowClick: (record: VersionData) => void;
    createdId?: string;
}

const VersionTable: React.FC<VersionTableProps> = props => {

    const [deleteId, setDeleteId] = useState<string>('');

    const { loading, fetchedData } = useFetch(`/api/v1/versions?os=${props.os}&platform=${props.platform}`, [deleteId, props.createdId]);

    const handleDeleteAction = (id: string) => {
        confirm({
            title: 'Are you sure delete this version?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                Axios.delete('/api/v1/versions/' + id)
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
            }
        });
    }

    return (
        <Table
            columns={[
                { title: '#', key: 'number', render: (text, record, index) => index + 1 },
                { title: 'version', key: 'version', dataIndex: 'version' },
                { title: 'mandatory', key: 'mandatory', render: (text, record, index) => record.mandatory ? 'YES' : 'NO' },
                { title: 'title', key: 'updateTitle', dataIndex: 'updateTitle' },
                { title: 'content', key: 'updateContent', dataIndex: 'updateContent' },
                { title: 'versionCode', key: 'versionCode', dataIndex: 'versionCode' },
                { title: 'appStoreId', key: 'appStoreId', dataIndex: 'appStoreId' },
                { title: 'downloadUrl', key: 'downloadUrl', dataIndex: 'downloadUrl' },
                { title: 'createdAt', key: 'createdAt', dataIndex: 'createdAt' },
                {
                    title: 'Action', key: 'action',
                    render: (text, record) => <Button onClick={() => handleDeleteAction(record.id)} type="link">Delete</Button>
                },
            ]}
            rowKey={record => record.id}
            dataSource={fetchedData}
            pagination={false}
            loading={loading}
            onRow={record => {
                return {
                    onClick: props.onRowClick.bind(null, record), // 点击行
                };
            }}
        />
    )
}

export default VersionTable;