import React, { useState } from 'react';
import { Button, message, Table, Modal, Tag } from 'antd';
import RoleForm from './components/role-form';
import AuthoritySelect from './components/authority-select';
import { Authority } from 'models/authority';
import { useFetch } from 'common/fetch-hook';
import Axios from 'common/network';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import HttpStatus from 'http-status-codes';

import { StyledCondition } from '../../components/styled';

const { confirm } = Modal;


const RolePage: React.FC = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [selectVisible, setSelectVisible] = useState(false);
    const [createdId, setCreatedId] = useState<number>();
    const [deleteId, setDeleteId] = useState<number>();
    const [editId, setEditId] = useState<number>();
    const [grantId, setGrantId] = useState<number>();

    const { loading, fetchedData } = useFetch(`/api/v1/roles/`, [deleteId, createdId, grantId, selectVisible]);

    const saveHandler = (values: Authority) => {
        setFormVisible(false);
        setCreatedId(values.id);
        message.success('Save Succeed!');
    }

    const handleDeleteAction = (id: number) => {
        confirm({
            title: 'Are you sure delete this record?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                Axios.delete('/api/v1/roles/' + id)
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

    const handleEditAction = (id: number) => {
        setFormVisible(true);
        setEditId(id);
    }

    const handleGrantAction = (id: number) => {
        setSelectVisible(true);
        setGrantId(id);
    }
    const grantSaveHandler = () => {
        setSelectVisible(false);
        message.success('Save Succeed!');
    }

    return (
        <div>
            <StyledCondition>
                <Button type="primary" onClick={() => setFormVisible(true)}>Create New Role</Button>
            </StyledCondition>
            <Table
                columns={[
                    { title: '#', key: 'number', width: 10, render: (text, record, index) => index + 1 },
                    { title: 'name', key: 'name', width: 100, dataIndex: 'name' },
                    { title: 'description', key: 'description', width: 200, dataIndex: 'description' },
                    {
                        title: 'authorities', key: 'authorities', width: 200, render: (text, record) =>
                            record.authorities?.map((authority: string) => <Tag color="blue">{authority}</Tag>)
                    },
                    {
                        title: 'Action', key: 'action', width: 150,
                        render: (text, record) => {
                            return (
                                <div>
                                    <Button onClick={() => handleGrantAction(record.id)} type="link">Grant Authorities</Button>
                                    {record.is_initial ? '' : (
                                        <>
                                            <Button onClick={() => handleEditAction(record.id)} type="link">Edit</Button>
                                            <Button onClick={() => handleDeleteAction(record.id)} type="link">Delete</Button>
                                        </>
                                    )}
                                </div>
                            )
                        }
                    },
                ]}
                rowKey={record => record.id}
                dataSource={fetchedData}
                pagination={false}
                loading={loading}
            />
            <RoleForm id={editId} visible={formVisible} onCancel={() => setFormVisible(false)} onSave={saveHandler} />
            <AuthoritySelect roleId={grantId} visible={selectVisible} onCancel={() => setSelectVisible(false)} onSave={grantSaveHandler} />
        </div>
    )
}


export default RolePage;