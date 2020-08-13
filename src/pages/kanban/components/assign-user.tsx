import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Select, message } from 'antd';
import HttpStatus from 'http-status-codes';
import Axios from 'common/network';
import { User } from 'models/user';

const { Option } = Select;

interface AssignUserProps {
    projectId: string;
    taskId: string;
    userId: string;
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
}
const AssignUser: React.FC<AssignUserProps> = (props) => {
    const [activeUserId, setActiveUserId] = useState<string>(props.userId);
    const [loading, setLoading] = useState<boolean>();
    const [userData, setUserData] = useState<User[]>();
    const fetchUser = useCallback(() => {
        setLoading(true);
        Axios.get(`/api/v1/projects/${props.projectId}/users`)
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    setUserData(res.data);
                }
            })
            .catch((err) => message.error('获取用户数据失败'))
            .finally(() => setLoading(false));
    }, [props.projectId]);
    const handleChange = (value: string) => {
        setActiveUserId(value);
    };
    const onOk = () => {
        Axios.patch(`/api/v1/tasks/${props.taskId}`, {
            userId: activeUserId,
        })
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    props.onOk();
                }
            })
            .catch((err) => message.error('操作失败'));
    };
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    return (
        <Modal
            visible={props.visible}
            title="人员分配"
            okText="确定"
            cancelText="取消"
            onCancel={props.onCancel}
            onOk={onOk}
        >
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="选择用户"
                defaultValue={activeUserId}
                loading={loading}
                filterOption={false}
                onSearch={fetchUser}
                onChange={handleChange}
            >
                {userData?.map((user: User) => (
                    <Option key={user.id} value={user.id}>
                        {user.nickname}
                    </Option>
                ))}
            </Select>
        </Modal>
    );
};

export default AssignUser;
