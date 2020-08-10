import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Button, Modal, message, Divider, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'common/network';
import { useFetch } from 'common/fetch-hook';
import { Project } from 'models/kanban';
import ProjectForm from './components/project-form';
import HttpStatus from 'http-status-codes';
import AssignUser from './components/assign-user';

import { StyledCondition } from '../../components/styled';

const { confirm } = Modal;

const ProjectPage: React.FC = () => {
    const history = useHistory();
    const [formVisible, setFormVisible] = useState(false);
    const [projectId, setProjectId] = useState<string>();
    const [showAssignUser, setShowAssignUser] = useState<boolean>(false);
    const [changeTimestamp, setChangeTimestamp] = useState<number>();
    const { loading, fetchedData } = useFetch<Project[]>('/api/v1/projects', [
        changeTimestamp,
    ]);

    const saveHandler = (values: Project) => {
        setFormVisible(false);
        const timestamp = new Date().getTime();
        setChangeTimestamp(timestamp);
        message.success('创建成功！');
    };

    const handleActiveAction = (id: string) => {
        axios
            .patch(`/api/v1/projects/${id}/active`)
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    const timestamp = new Date().getTime();
                    setChangeTimestamp(timestamp);
                    message.success('设置成功!');
                }
            })
            .catch((err) => message.error(err.message));
    };

    const handleDeleteAction = (id: string) => {
        confirm({
            title: '确定删除当前记录？',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                axios
                    .delete('/api/v1/projects/' + id)
                    .then((res) => {
                        if (res.status === HttpStatus.NO_CONTENT) {
                            const timestamp = new Date().getTime();
                            setChangeTimestamp(timestamp);
                            message.success('删除成功!');
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        message.error(err.message);
                    });
            },
        });
    };

    const handleAssignUserAction = (id: string) => {
        setShowAssignUser(true);
        setProjectId(id);
    };

    const handleStageAction = (id: string) => {
        history.push('/main/stage?projectId=' + id);
    };
    return (
        <div>
            <StyledCondition>
                <Button type="primary" onClick={() => setFormVisible(true)}>
                    创建新项目
                </Button>
            </StyledCondition>
            <Table
                columns={[
                    {
                        title: '#',
                        key: 'number',
                        render: (text, record, index) => index + 1,
                    },
                    { title: '项目编号', key: 'code', dataIndex: 'code' },
                    { title: '项目名称', key: 'name', dataIndex: 'name' },
                    {
                        title: '简单介绍',
                        key: 'description',
                        dataIndex: 'description',
                    },
                    {
                        title: '默认项目',
                        key: 'active',
                        render: (text, record) =>
                            record.active ? (
                                <Tag color="green">是</Tag>
                            ) : (
                                <Tag color="default">否</Tag>
                            ),
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (text, record) => {
                            return record.active ? (
                                <div>
                                    <Button
                                        onClick={() =>
                                            handleStageAction(record.id)
                                        }
                                        type="link"
                                    >
                                        阶段管理
                                    </Button>
                                    <Divider type="vertical" />
                                    {/* <Button onClick={() => handleAssignUserAction(record.id)} type="link">移交项目</Button> */}
                                    <Button
                                        onClick={() =>
                                            handleAssignUserAction(record.id)
                                        }
                                        type="link"
                                    >
                                        人员管理
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button
                                        onClick={() =>
                                            handleStageAction(record.id)
                                        }
                                        type="link"
                                    >
                                        阶段管理
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleActiveAction(record.id)
                                        }
                                        type="link"
                                    >
                                        设为默认
                                    </Button>
                                    <Divider type="vertical" />
                                    <Button
                                        onClick={() =>
                                            handleAssignUserAction(record.id)
                                        }
                                        type="link"
                                    >
                                        人员管理
                                    </Button>
                                    {/* <Button onClick={() => handleAssignUserAction(record.id)} type="link">移交项目</Button> */}
                                    <Divider type="vertical" />
                                    <Button
                                        onClick={() =>
                                            handleDeleteAction(record.id)
                                        }
                                        type="link"
                                    >
                                        删除
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
            <ProjectForm
                visible={formVisible}
                onCancel={() => setFormVisible(false)}
                onSave={saveHandler}
            />
            <AssignUser
                visible={showAssignUser}
                projectId={projectId}
                onCancel={() => setShowAssignUser(false)}
                onOk={() => setShowAssignUser(false)}
            />
        </div>
    );
};

export default ProjectPage;
