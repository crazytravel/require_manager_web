import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Table, Button, Modal, message, Divider } from 'antd';
import { ExclamationCircleOutlined, LeftOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import axios from 'config/network';
import { useFetch } from 'hooks/fetch';
import { Project, Stage } from 'models/kanban';
import StageForm from './components/stage-form';
import HttpStatus from 'http-status-codes';
import styled from 'styled-components';

const { confirm } = Modal;

const StagePage: React.FC = props => {
    const history = useHistory();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const projectId = searchParams.get('projectId');
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState<Stage>();
    const [changeTimestamp, setChangeTimestamp] = useState<number>();
    const { loading, fetchedData } = useFetch<Stage[]>('/api/v1/projects/' + projectId + '/stages', [changeTimestamp]);

    const saveHandler = (values: Project) => {
        setFormVisible(false);
        const timestamp = new Date().getTime();
        setChangeTimestamp(timestamp);
        message.success('创建成功！');
    }

    const handleUpdateAction = (id: string) => {
        axios.get('/api/v1/stages/' + id)
            .then(res => {
                if (res.status === HttpStatus.OK) {
                    setFormData(res.data);
                }
            }).catch(err => message.error(err.message));
        setFormVisible(true);
    }

    const handleDeleteAction = (id: string) => {
        confirm({
            title: '确定删除当前记录？',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                axios.delete('/api/v1/stages/' + id)
                    .then(res => {
                        if (res.status === HttpStatus.NO_CONTENT) {
                            const timestamp = new Date().getTime();
                            setChangeTimestamp(timestamp);
                            message.success('删除成功!');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        message.error(err.message);
                    });
            },
        })
    }

    const handleUpAction = (id: string) => {
        axios.patch(`/api/v1/stages/${id}/up`)
        .then(res => {
            if (res.status === HttpStatus.OK) {
                const timestamp = new Date().getTime();
                setChangeTimestamp(timestamp);
                message.success('操作成功!');
            }
        }).catch(err => {
            message.error(err.message);
        });
    }

    const handleDownAction = (id: string) => {
        axios.patch(`/api/v1/stages/${id}/down`)
        .then(res => {
            if (res.status === HttpStatus.OK) {
                const timestamp = new Date().getTime();
                setChangeTimestamp(timestamp);
                message.success('操作成功!');
            }
        }).catch(err => {
            message.error(err.message);
        });
    }

    return (
        <div>
            <StyledCondition>
                <Button type="link" onClick={() => history.goBack()}><LeftOutlined /></Button>
                <Button type="primary" onClick={() => setFormVisible(true)}>创建新阶段</Button>
            </StyledCondition>
            <Table
                columns={[
                    { title: '#', key: 'number', render: (text, record, index) => index + 1 },
                    { title: '阶段名称', key: 'name', dataIndex: 'name' },
                    {
                        title: '操作', key: 'action',
                        render: (text, record, index) => {
                            if (index === 0 && record.nextId !== '-1') {
                                return <div>
                                    <Button onClick={() => handleUpdateAction(record.id)} type="link">修改</Button>
                                    <Divider type="vertical" />
                                    <Button onClick={() => handleDeleteAction(record.id)} type="link">删除</Button>
                                    <Divider type="vertical" />
                                    <Button onClick={() => handleDownAction(record.id)} type="link"><ArrowDownOutlined /></Button>
                                </div>
                            } else if (index !== 0 && record.nextId === '-1') {
                                return <div>
                                    <Button onClick={() => handleUpdateAction(record.id)} type="link">修改</Button>
                                    <Divider type="vertical" />
                                    <Button onClick={() => handleDeleteAction(record.id)} type="link">删除</Button>
                                    <Divider type="vertical" />
                                    <Button onClick={() => handleUpAction(record.id)} type="link"><ArrowUpOutlined /></Button>
                                </div>
                            } else if (index === 0 && record.nextId === '-1') {
                                return <div>
                                    <Button onClick={() => handleUpdateAction(record.id)} type="link">修改</Button>
                                    <Divider type="vertical" />
                                    <Button onClick={() => handleDeleteAction(record.id)} type="link">删除</Button>
                                </div>
                            } else {
                                return <div>
                                    <Button onClick={() => handleUpdateAction(record.id)} type="link">修改</Button>
                                    <Divider type="vertical" />
                                    <Button onClick={() => handleDeleteAction(record.id)} type="link">删除</Button>
                                    <Divider type="vertical" />
                                    <Button onClick={() => handleDownAction(record.id)} type="link"><ArrowDownOutlined /></Button>
                                    <Divider type="vertical" />
                                    <Button onClick={() => handleUpAction(record.id)} type="link"><ArrowUpOutlined /></Button>
                                </div>
                            }
                        }
                    },
                ]}
                rowKey={record => record.id}
                dataSource={fetchedData}
                pagination={false}
                loading={loading}
            />
            <StageForm projectId={projectId} data={formData} visible={formVisible} onCancel={() => setFormVisible(false)} onSave={saveHandler} />
        </div>
    )
}


const StyledCondition = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 10px 0;
`;

export default StagePage;