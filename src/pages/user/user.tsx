import React, { useState } from 'react';
import { Table, Button, Modal, message, Switch, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import HttpStatus from 'http-status-codes';
import Axios from 'common/network';
import RoleSelect from './components/role-select';
import { useFetch } from 'common/fetch-hook';

const { confirm } = Modal;

const UserPage: React.FC = () => {
    const [selectVisible, setSelectVisible] = useState(false);
    const [grantId, setGrantId] = useState<number>();

    const [changedId, setChangedId] = useState<string>('');
    const [activeStatus, setActiveStatus] = useState<boolean>();

    const { loading, fetchedData } = useFetch(`/api/v1/users/`, [
        changedId,
        activeStatus,
        grantId,
        selectVisible,
    ]);

    const handleDeleteAction = (id: string) => {
        confirm({
            title: 'Are you sure delete this user?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                Axios.delete('/api/v1/users/' + id)
                    .then((res) => {
                        if (res.status === HttpStatus.NOT_FOUND) {
                            setChangedId(id);
                            message.success('delete succeed!');
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        message.error(err.message);
                    });
            },
        });
    };

    const handleActiveAction = (id: string, active: boolean) => {
        confirm({
            title: 'Are you sure change this user status?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                Axios.put('/api/v1/users/' + id, { active: !active })
                    .then((res) => {
                        if (res.status === HttpStatus.CREATED) {
                            setActiveStatus(!active);
                            message.success('change succeed!');
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        message.error(err.message);
                    });
            },
        });
    };

    const handleGrantAction = (id: number) => {
        setSelectVisible(true);
        setGrantId(id);
    };
    const grantSaveHandler = () => {
        setSelectVisible(false);
        message.success('Save Succeed!');
    };

    return (
        <div>
            <Table
                columns={[
                    {
                        title: '#',
                        key: 'number',
                        render: (text, record, index) => index + 1,
                    },
                    {
                        title: 'Username',
                        key: 'username',
                        dataIndex: 'username',
                    },
                    {
                        title: 'Nickname',
                        key: 'nickname',
                        dataIndex: 'nickname',
                    },
                    { title: 'Email', key: 'email', dataIndex: 'email' },
                    { title: 'Phone', key: 'phone', dataIndex: 'phone' },
                    {
                        title: 'Created At',
                        key: 'created_at',
                        dataIndex: 'created_at',
                    },
                    {
                        title: 'Roles',
                        key: 'roles',
                        render: (text, record) =>
                            record.roles?.map((role: string) => (
                                <Tag color="blue">{role}</Tag>
                            )),
                    },
                    {
                        title: 'Active',
                        key: 'active',
                        render: (text, record, index) => (
                            <Switch
                                checked={record.active}
                                onChange={() =>
                                    handleActiveAction(record.id, record.active)
                                }
                            />
                        ),
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 200,
                        render: (text, record) => {
                            return (
                                <div>
                                    <Button
                                        onClick={() =>
                                            handleGrantAction(record.id)
                                        }
                                        type="link"
                                    >
                                        Assign Roles
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleDeleteAction(record.id)
                                        }
                                        type="link"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            );
                        },
                    },
                ]}
                rowKey={(record) => record.id}
                dataSource={fetchedData}
                pagination={false}
                loading={loading}
            />
            <RoleSelect
                userId={grantId}
                visible={selectVisible}
                onCancel={() => setSelectVisible(false)}
                onSave={grantSaveHandler}
            />
        </div>
    );
};

export default UserPage;
