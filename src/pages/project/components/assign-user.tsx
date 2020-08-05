import React from 'react';
import { Modal, Table, Input } from 'antd';
import { useFetch } from 'common/fetch-hook';
// import Axios from 'common/network';
const { Search } = Input;

interface AssignUserProps {
    projectId: string | undefined,
    visible: boolean,
    onCancel: () => void,
    onOk: () => void,
}
const AssignUser: React.FC<AssignUserProps> = props => {
    const { loading, fetchedData } = useFetch(`/api/v1/users`);

    const onOk = () => {
        props.onOk();
        // Axios.post()
    }
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
                onSearch={value => console.log(value)}
            />
            <Table
                columns={[
                    { title: '#', key: 'number', render: (text, record, index) => index + 1 },
                    { title: '用户名', key: 'username', dataIndex: 'username' },
                    { title: '昵称', key: 'nickname', dataIndex: 'nickname' },
                ]}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                }}
                rowKey={record => record.id}
                dataSource={fetchedData}
                pagination={false}
                loading={loading}
            />
        </Modal>
    )
}

export default AssignUser;