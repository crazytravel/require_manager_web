import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { useFetch } from '../../../hooks/fetch';
import Axios from '../../../config/network';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import HttpStatus from 'http-status-codes';

const { confirm } = Modal;

interface AuthorityTableProps {
    createdId: number | undefined
}

const AuthorityTable: React.FC<AuthorityTableProps> = props => {

    const [deleteId, setDeleteId] = useState<string>('');

    const { loading, fetchedData } = useFetch(`/api/v1/authorities/`, [deleteId, props.createdId]);

    const handleDeleteAction = (id: string) => {
        confirm({
            title: 'Are you sure delete this record?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                Axios.delete('/api/v1/authorities/' + id)
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
                { title: 'name', key: 'name', dataIndex: 'name' },
                { title: 'description', key: 'description', dataIndex: 'description' },
                {
                    title: 'Action', key: 'action',
                    render: (text, record) => <Button onClick={() => handleDeleteAction(record.id)} type="link">Delete</Button>
                },
            ]}
            rowKey={record => record.id}
            dataSource={fetchedData}
            pagination={false}
            loading={loading}
        />
    )
}

export default AuthorityTable;