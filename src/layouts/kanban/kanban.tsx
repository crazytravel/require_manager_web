import React from 'react';
import { Tooltip, Button } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined, LoadingOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import AdminHeader from './components/kanban-header';
import CardContainer from './components/card-container';
import DragCard from './components/drag-card';

const AdminLayout: React.FC = props => {

    return (
        <Container>
            <AdminHeader />
            <Subtitle>
                <h3>KANBAN</h3>
                <Link to="/main">
                    <Tooltip placement="bottom" title="Ask for Support">
                        <SettingOutlined style={{ fontSize: '2rem', color: 'rgba(0, 0, 0, 0.65)' }} />
                    </Tooltip>
                </Link>
            </Subtitle>
            <DndProvider backend={HTML5Backend}>
            <ContentWrapper>
                <Content>
                    <CardContainer title="代办">
                        <Link to="/main"><DragCard /></Link>
                        <Link to="/main"><DragCard /></Link>
                        <Link to="/main"><DragCard /></Link>
                    </CardContainer>
                    <CardContainer title="开发中">
                        <Link to="/main"><DragCard /></Link>
                    </CardContainer>
                    <CardContainer title="已完成">
                        <Link to="/main"><DragCard /></Link>
                    </CardContainer>
                </Content>
                <Button type="dashed" style={{width: 250, height: 40, marginLeft: 10}}> + 创建新列表</Button>
            </ContentWrapper>
            </DndProvider>
        </Container >
    )
}

const Loading = () => {
    return (
        <LoadingContainer>
            <span><LoadingOutlined /></span>
        </LoadingContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Subtitle = styled.div`
    background-color: #fff;
    height: 5rem;
    line-height: 5rem;
    padding: 0 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    z-index: 10;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    background-color: #f5f7f9;
    overflow: auto;
    padding: 15px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
`;

const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
        font-size: 5rem;
        color: rgba(0, 0, 0, 0.65);
    }
`;

export default AdminLayout;