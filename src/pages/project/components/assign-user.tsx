import React, { useState, useEffect } from 'react';
import { Modal, Table, Input, message } from 'antd';
import HttpStatus from 'http-status-codes';
import { useFetch } from 'common/fetch-hook';
import Axios from 'common/network';
import { User } from 'models/user';
const { Search } = Input;

interface AssignUserProps {
    projectId: string | undefined;
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
}
const AssignUser: React.FC<AssignUserProps> = (props) => {
    const [selectedIds, setSelectedIds] = useState<React.ReactText[]>();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Axios.get('/api/v1/users')
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    setUserData(res.data);
                }
            })
            .catch((err) => message.error('加载失败'))
            .then(() => setLoading(false));
        Axios.get(`/api/v1/projects/${props.projectId}/users`).then((res) => {
            if (res.status === HttpStatus.OK) {
                const selectedIds = res.data?.map((user: User) => user.id);
                setSelectedIds(selectedIds);
            }
        });
    }, [props.projectId]);
    const onOk = () => {
        props.onOk();
        // Axios.post()
    };
    return (
        <Modal
            visible={props.visible}
            title="人员分配"
            okText="确定"
            cancelText="取消"
            onCancel={props.onCancel}
            onOk={onOk}
        >
            <Search
                placeholder="搜索用户"
                enterButton
                onSearch={(value) => console.log(value)}
            />
            <Table
                columns={[
                    {
                        title: '#',
                        key: 'number',
                        render: (text, record, index) => index + 1,
                    },
                    { title: '用户名', key: 'username', dataIndex: 'username' },
                    { title: '昵称', key: 'nickname', dataIndex: 'nickname' },
                ]}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(
                            `selectedRowKeys: ${selectedRowKeys}`,
                            'selectedRows: ',
                            selectedRows,
                        );
                    },
                    selectedRowKeys: selectedIds,
                }}
                rowKey={(record) => record.id}
                dataSource={userData}
                pagination={false}
                loading={loading}
            />
        </Modal>
    );
};

export default AssignUser;
