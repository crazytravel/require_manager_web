import React, { useState } from 'react';
import { Button, Modal, message, Input, Menu, Dropdown } from 'antd';
import { EditOutlined, ExclamationCircleOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { Draggable, DraggableStateSnapshot, DraggableProvided } from "react-beautiful-dnd";
import styled from 'styled-components';
import HttpStatus from 'http-status-codes';
import { Task } from 'models/kanban';
import axios from 'config/network';

const { TextArea } = Input;
const { confirm } = Modal;


export interface DragItem {
    type: 'card' | 'box',
    task: Task,
    cardHeight: number | undefined,
}

interface CardProps {
    id: string,
    index: number,
    content: string,
    onOperatorSuccess: () => void,
}

const Card: React.FC<CardProps> = ({
    id,
    index,
    content,
    onOperatorSuccess,
}) => {

    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [readonlyContent, setReadonlyContent] = useState<string>(content);
    const [editContent, setEditContent] = useState<string>(content);

    const handleEditAction = () => {
        setShowForm(!showForm);
        setReadonlyContent('');
    }

    const handleOnSave = () => {
        setShowForm(false);

        axios.patch('/api/v1/tasks/' + id, { content: editContent })
            .then(res => {
                if (res.status === HttpStatus.OK) {
                    setReadonlyContent(editContent);
                    message.success('操作成功!');
                }
            }).catch(err => {
                setReadonlyContent(content);
                message.error('操作失败', err);
            });
    }

    const handleOnCancel = () => {
        setReadonlyContent(content);
        setShowForm(false);
    }

    const handleEnter = () => {
        if (showForm) {
            return;
        }
        setShowEdit(true);
    }

    const handleLeave = () => {
        setShowEdit(false);
    }

    const handleOnDelete = () => {
        confirm({
            title: '确定删除当前记录？',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                axios.delete('/api/v1/tasks/' + id)
                    .then(res => {
                        if (res.status === HttpStatus.NO_CONTENT) {
                            message.success('操作成功!');
                            // refresh 
                            onOperatorSuccess();
                        }
                    }).catch(err => {
                        message.error('操作失败!', err.message);
                    }).finally(() => {
                        setShowForm(false);
                    })
            },
        })
    }

    const handleAssignUser = () => {

    //     return (
    //         // <Modal
    //         //     visible={props.visible}
    //         //     title="人员分配"
    //         //     okText="保存"
    //         //     cancelText="取消"
    //         //     onCancel={props.onCancel}
    //         //     onOk={okHandler}
    //         // >
    //         // </Modal>
    //     )
    }

    const menu = (
        <Menu>
            <Menu.Item icon={<UserOutlined />} onClick={handleAssignUser} >分配人员</Menu.Item>
            <Menu.Item icon={<EditOutlined />} onClick={handleEditAction} >编辑</Menu.Item>
            <Menu.Item icon={<DeleteOutlined />} onClick={handleOnDelete} danger>删除</Menu.Item>
        </Menu>
    );
    return (
        <Draggable draggableId={id} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <Wrapper ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Content>{readonlyContent}</Content>
                    <Overlay onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                        {showEdit ? <ButtonWrapper>
                            <Dropdown overlay={menu} >
                                <Button style={{ color: 'rgba(0, 0, 0, 0.65)' }} type="link" onClick={handleEditAction}><EditOutlined /></Button>
                            </Dropdown>
                        </ButtonWrapper>
                            : ''}
                    </Overlay>
                    <Bottom>
                        {showForm ? <TextArea autoFocus={true} autoSize={{ minRows: 2 }} onInput={(e) => setEditContent(e.currentTarget.value)} value={editContent} />
                            : ''}
                    </Bottom>
                    {showForm ?
                        <FormButtonWrapper>
                            <EditButtonWrapper>
                                <Button type="default" onClick={handleOnCancel} >取消</Button>
                                <Button type="primary" onClick={handleOnSave} style={{ marginLeft: 5 }}>保存</Button>
                            </EditButtonWrapper>
                        </FormButtonWrapper> : ''
                    }
                </Wrapper>
            )}
        </Draggable>
    )
}

const defaultBackgroundColor = '#ebecf0';
interface WrapperProps {
    isDragging: boolean
}

const Wrapper = styled.div<WrapperProps>`
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    margin-bottom: 10px;
    background-color: ${props => props.isDragging ? '#AED581' : '#fff'};
    padding: 10px;
    border-radius: 2px;
`;

const Content = styled.span`
    white-space: normal;
    word-wrap:break-word;
    word-break:break-all; 
`;

const Overlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 2px;
`;

const ButtonWrapper = styled.div`
    background-color: #ebecf0;
    color: #000;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
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
export default Card;