import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import HttpStatus from 'http-status-codes';
import Column from './components/column';
import TopHeader from 'components/top-header';
import Toolbar from 'components/toolbar';
import { Project, Stage } from 'models/kanban';
import axios from 'config/network';
import { message } from 'antd';


const KanbanLayout: React.FC = props => {
    const [changeTimestamp, setChangeTimestamp] = useState<number>();
    const [projectId, setProjectId] = useState<string>();
    const [activeProject, setActiveProject] = useState<Project>();
    const [stages, setStages] = useState<Stage[]>();

    useEffect(() => {
        axios.get('/api/v1/projects/active')
            .then(res => {
                if (res.status === HttpStatus.OK) {
                    setActiveProject(res.data);
                    if (res.data) {
                        console.log(res.data)
                        setProjectId(res.data.id);
                        loadStages(res.data.id);
                    }
                }
            }).catch(err => {
                message.error(err);
            });
    }, []);

    const loadStages = (projectId: string) => {
        console.log(projectId);
        axios.get(`/api/v1/projects/${projectId}/stages`)
            .then(res => {
                if (res.status === HttpStatus.OK) {
                    setStages(res.data);
                }
            }).catch(err => {
                message.error(err);
            });
    }
    // const stageMap: StageMap = {};
    // stagesData.fetchedData?.map(stage => stageMap[stage.id] = stage);

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return;
        }
        // droppableId is stageId
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }
        // const startStage = stageMap[source.droppableId];
        // const finishStage = stageMap[destination.droppableId];
        axios.put(`/api/v1/tasks/${draggableId}/reorder`, {
            sourceStageId: source.droppableId,
            destinationStageId: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
        }).then(res => {
            if (res.status === HttpStatus.OK) {
                // refresh task list
                const timestamp = new Date().getTime();
                setChangeTimestamp(timestamp);
            }
        }).catch(err => {
            message.error(err);
        })
        // change task sequence
        // if (startStage === finishStage) {

        //     // const newTaskIds = Array.from(startStage.taskIds);
        //     // newTaskIds.splice(source.index, 1);
        //     // newTaskIds.splice(destination.index, 0, draggableId);
        //     // const newStage = {
        //     //     ...startStage,
        //     //     taskIds: newTaskIds,
        //     // };
        //     // setStages({ ...stageMap, [newStage.id]: newStage });
        //     return;
        // }
        // // moving from one list to another
        // const startTaskIds = Array.from(startStage.taskIds);
        // startTaskIds.splice(source.index, 1);
        // const newStart = {
        //     ...startStage,
        //     taskIds: startTaskIds,
        // };

        // const finishTaskIds = Array.from(finishStage.taskIds);
        // finishTaskIds.splice(destination.index, 0, draggableId);
        // const newFinish = {
        //     ...finishStage,
        //     taskIds: finishTaskIds,
        // };
        // setStages({
        //     ...stages,
        //     [newStart.id]: newStart,
        //     [newFinish.id]: newFinish,
        // })
    }

    const loadTask = (projectId: string) => {
        console.log('项目ID:', projectId);
        setProjectId(projectId);
        loadStages(projectId);
    }
    return (
        <Layout style={{ height: '100%' }}>
            <TopHeader />
            <Toolbar onFinish={loadTask} activeProjectId={activeProject?.id} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    <Content>
                        {stages?.map((stage: Stage) => {
                            // const currentTasks = stage.taskIds.map(taskId => tasks[taskId]);
                            return <Column
                                changeTimestamp={changeTimestamp}
                                key={stage.id}
                                stageId={stage.id}
                                projectId={projectId}
                                title={stage.name} />
                        })}
                    </Content>
                </Container>
            </DragDropContext>
        </Layout>

    )
}

const Layout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;


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



export default KanbanLayout;