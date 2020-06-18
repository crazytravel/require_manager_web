import React, { useState, useEffect } from 'react';
import { Table, Modal, message } from 'antd';
import Axios from 'config/network';
import HttpStatus from 'http-status-codes';
import { UserRole } from 'models/role';

interface RoleSelectProps {
    userId: number | undefined;
    visible: boolean;
    onSave: () => void;
    onCancel: () => void;
}

const RoleSelect: React.FC<RoleSelectProps> = props => {

    const [selectedIds, setSelectedIds] = useState<React.ReactText[]>()
    const [loading, setLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState()

    useEffect(() => {
        if (props.userId) {
            setLoading(true);
            Axios.get('/api/v1/roles/')
                .then(res => {
                    if (res.status === HttpStatus.OK) {
                        setFetchedData(res.data);
                    }
                })
                .catch(err => message.error('load error:' + err.message))
                .then(() => {
                    setLoading(false);
                });
            Axios.get('/api/v1/userAndRoles/' + props.userId + '/assign')
                .then(res => {
                    if (res.status === HttpStatus.OK) {
                        const selectedIds: number[] = []
                        res.data?.forEach((userRole: UserRole) => {
                            selectedIds.push(userRole.role_id);
                        });
                        setSelectedIds(selectedIds);
                    }
                })
                .catch(err => message.error('load error:' + err.message))
        }

    }, [props.userId])

    const okHandler = () => {
        Axios.put('/api/v1/userAndRoles/' + props.userId + '/assign', { roleIds: selectedIds })
            .then(res => {
                if (res.status === HttpStatus.CREATED) {
                    props.onSave();
                }
            }).catch(err => {
                message.error("save data failed, reason:" + err.message);
            })
    }
    return (
        <Modal
            visible={props.visible}
            width={750}
            style={{ maxHeight: 500 }}
            title="Grant role to user"
            okText="Save"
            cancelText="Cancel"
            onCancel={props.onCancel}
            onOk={okHandler}
        >
            <Table
                columns={[
                    { title: '#', key: 'number', render: (text, record, index) => index + 1 },
                    { title: 'name', key: 'name', dataIndex: 'name' },
                    { title: 'description', key: 'description', dataIndex: 'description' },
                ]}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => setSelectedIds(selectedRowKeys),
                    selectedRowKeys: selectedIds,
                }}
                rowKey={record => record.id}
                dataSource={fetchedData}
                pagination={false}
                loading={loading}
            />
        </Modal>
    );
}

export default RoleSelect;