import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { LoadingOutlined } from '@ant-design/icons';
import HttpStatus from 'http-status-codes';
import Column from './components/column';
import Toolbar from 'components/toolbar';
import { Project, Stage } from 'models/kanban';
import axios from 'common/network';
import { message } from 'antd';
import KanbanLayout from 'layouts/kanban';

const KanbanPage: React.FC = (props) => {
    const [changeTimestamp, setChangeTimestamp] = useState<number>();
    const [projectId, setProjectId] = useState<string>();
    const [activeProject, setActiveProject] = useState<Project>();
    const [stages, setStages] = useState<Stage[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get('/api/v1/projects/active')
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    setActiveProject(res.data);
                    if (res.data) {
                        console.log(res.data);
                        setProjectId(res.data.id);
                        loadStages(res.data.id);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const loadStages = (projectId: string) => {
        console.log(projectId);
        axios
            .get(`/api/v1/projects/${projectId}/stages`)
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    setStages(res.data);
                }
            })
            .catch((err) => {
                message.error(err);
            });
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return;
        }
        // droppableId is stageId
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        setLoading(true);
        axios
            .put(`/api/v1/tasks/${draggableId}/reorder`, {
                sourceStageId: source.droppableId,
                destinationStageId: destination.droppableId,
                sourceIndex: source.index,
                destinationIndex: destination.index,
            })
            .then((res) => {
                if (res.status === HttpStatus.OK) {
                    // refresh task list
                    const timestamp = new Date().getTime();
                    setChangeTimestamp(timestamp);
                }
            })
            .catch((err) => {
                message.error(err);
            })
            .finally(() => setLoading(false));
    };

    const loadTask = (projectId: string) => {
        console.log('项目ID:', projectId);
        setProjectId(projectId);
        loadStages(projectId);
    };
    return (
        <KanbanLayout>
            <Toolbar onFinish={loadTask} activeProjectId={activeProject?.id} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    <Content>
                        {stages?.map((stage: Stage) => {
                            // const currentTasks = stage.taskIds.map(taskId => tasks[taskId]);
                            return (
                                <Column
                                    changeTimestamp={changeTimestamp}
                                    key={stage.id}
                                    stageId={stage.id}
                                    projectId={projectId}
                                    title={stage.name}
                                />
                            );
                        })}
                    </Content>
                </Container>
            </DragDropContext>
            {loading ? <Loading /> : ''}
        </KanbanLayout>
    );
};

const Loading = () => {
    return (
        <LoadingContainer>
            <LoadingOutlined />
        </LoadingContainer>
    );
};

const Container = styled.div`
    padding: 20px;
    flex: 1;
    height: 0;
    overflow-y: hidden;
    overflow-x: auto;
`;

const Content = styled.div`
    display: inline-flex;
    height: 100%;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    font-size: 3rem;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 10;
`;

export default KanbanPage;
