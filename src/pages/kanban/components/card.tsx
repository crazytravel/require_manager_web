/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Modal, message, Input, Menu, Dropdown } from 'antd';
import {
    EditOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import {
    Draggable,
    DraggableStateSnapshot,
    DraggableProvided,
} from 'react-beautiful-dnd';
import styled from 'styled-components';
import HttpStatus from 'http-status-codes';
import { Task } from 'models/kanban';
import axios from 'common/network';
import AssignUser from './assign-user';
import Avatar from './avatar';

const { TextArea } = Input;
const { confirm } = Modal;

export interface DragItem {
    type: 'card' | 'box';
    task: Task;
    cardHeight: number | undefined;
}

interface CardProps {
    index: number;
    task: Task;
    onOperatorSuccess: () => void;
}

const Card: React.FC<CardProps> = ({ index, task, onOperatorSuccess }) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showAssignUser, setShowAssignUser] = useState<boolean>(false);
    const [readonlyContent, setReadonlyContent] = useState<string>(
        task.content,
    );
    const [editContent, setEditContent] = useState<string>(task.content);

    const handleEditAction = () => {
        setShowForm(!showForm);
        setReadonlyContent('');
    };

    const handleOnSave = () => {
        setShowForm(false);

        axios
            .patch('/api/v1/tasks/' + task.id, { content: editContent })
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    setReadonlyContent(editContent);
                    message.success('操作成功!');
                }
            })
            .catch((err) => {
                setReadonlyContent(task.content);
                message.error('操作失败', err);
            });
    };

    const handleOnCancel = () => {
        setReadonlyContent(task.content);
        setShowForm(false);
    };

    const handleOnDelete = () => {
        confirm({
            title: '确定删除当前记录？',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                axios
                    .delete('/api/v1/tasks/' + task.id)
                    .then((res) => {
                        if (res.status === HttpStatus.NO_CONTENT) {
                            onOperatorSuccess();
                            message.success('操作成功!');
                            // refresh
                        }
                    })
                    .catch((err) => {
                        message.error('操作失败!', err.message);
                    })
                    .finally(() => {
                        setShowForm(false);
                    });
            },
        });
    };

    const handleAssignUser = () => {
        onOperatorSuccess();
        setShowAssignUser(false);
        message.success('操作成功!');
    };

    const menu = (
        <Menu>
            <Menu.Item
                icon={<UserOutlined />}
                onClick={() => setShowAssignUser(true)}
            >
                分配人员
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} onClick={handleEditAction}>
                编辑
            </Menu.Item>
            <Menu.Item
                icon={<DeleteOutlined />}
                onClick={handleOnDelete}
                danger
            >
                删除
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <Draggable draggableId={task.id} index={index}>
                {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot,
                ) => (
                    <Wrapper
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Title>
                            <IndexNumber>{task.code}</IndexNumber>
                            <AvatarWrapper>
                                {task.userId ? (
                                    <Avatar userId={task.userId}></Avatar>
                                ) : (
                                    ''
                                )}
                                <Overlay>
                                    <ButtonWrapper>
                                        <Dropdown overlay={menu}>
                                            <EditOutlined />
                                        </Dropdown>
                                    </ButtonWrapper>
                                </Overlay>
                            </AvatarWrapper>
                        </Title>
                        <Content>{readonlyContent}</Content>

                        <Bottom>
                            {showForm ? (
                                <TextArea
                                    autoFocus={true}
                                    autoSize={{ minRows: 2 }}
                                    onInput={(e) =>
                                        setEditContent(e.currentTarget.value)
                                    }
                                    value={editContent}
                                />
                            ) : (
                                ''
                            )}
                        </Bottom>
                        {showForm ? (
                            <FormButtonWrapper>
                                <EditButtonWrapper>
                                    <Button
                                        type="default"
                                        onClick={handleOnCancel}
                                    >
                                        取消
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={handleOnSave}
                                        style={{ marginLeft: 5 }}
                                    >
                                        保存
                                    </Button>
                                </EditButtonWrapper>
                            </FormButtonWrapper>
                        ) : (
                            ''
                        )}
                    </Wrapper>
                )}
            </Draggable>
            <AssignUser
                visible={showAssignUser}
                projectId={task.projectId || ''}
                userId={task.userId || ''}
                taskId={task.id}
                onCancel={() => setShowAssignUser(false)}
                onOk={handleAssignUser}
            />
        </>
    );
};

const defaultBackgroundColor = '#ebecf0';
interface WrapperProps {
    isDragging: boolean;
}

const Wrapper = styled.div<WrapperProps>`
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    margin-bottom: 10px;
    background-color: ${(props) => (props.isDragging ? '#AED581' : '#fff')};
    padding: 10px;
    border-radius: 2px;
`;

const Content = styled.div`
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
`;

const Overlay = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 2px;
`;

const ButtonWrapper = styled.div`
    color: rgba(0, 0, 0, 0.65);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 2px;
    margin-left: 8px;
`;

const Bottom = styled.div`
    text-align: center;
    background-color: ${defaultBackgroundColor};
`;

const FormButtonWrapper = styled.div`
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const EditButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 5px;
`;
const AvatarWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const IndexNumber = styled.span`
    color: rgba(0, 0, 0, 0.3);
`;

export default Card;
