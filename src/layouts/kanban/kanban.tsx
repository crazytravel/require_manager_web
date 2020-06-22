import React, { useRef } from 'react';
import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined, LoadingOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import AdminHeader from './components/kanban-header';
import StageContextProvider from './components/stage-context';

const AdminLayout: React.FC = props => {
    const contentRef = useRef<HTMLDivElement>(null);
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
                <Content ref={contentRef}>
                    <StageContextProvider scroll={() => {
                        console.log('执行')
                        contentRef.current?.scrollIntoView({ block: 'end' });
                    }} />
                </Content>
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


const Content = styled.div`
    white-space: nowrap;
    height: 100%;
    background-color: #f5f7f9;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    padding: 15px;
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