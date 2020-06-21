import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import styled from 'styled-components';

import MainHeader from './components/main-header';
import MainMenu, { MenuItem } from './components/main-menu';
import { menuData } from 'config/menu';
import { MainRoutes } from 'config/routes';

const { Sider, Content, Footer } = Layout;

const MainLayout: React.FC = () => {

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<MenuItem>();

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider breakpoint="sm"
                // collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                trigger={null} collapsible collapsed={collapsed}>
                <Logo>{collapsed ? '需求' : '需求管理系统'}</Logo>
                <MainMenu menuData={menuData} selectCallback={item => {
                    setSelectedMenu(item);
                }} />
            </Sider>
            <Layout>
                <MainHeader onToggleClick={(collapsedParam) => setCollapsed(collapsedParam)} />
                <ContentHeader>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/main/welcome">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>{selectedMenu?.text}</Breadcrumb.Item>
                    </Breadcrumb>
                    <ContentTitle>{selectedMenu?.text}</ContentTitle>
                </ContentHeader>
                <StyledContent>
                    <MainRoutes />
                </StyledContent>
                <Footer style={{ textAlign: 'center' }}>Require Manager @ 2020</Footer>
            </Layout>
        </Layout>
    );
}

const Logo = styled.div`
    height: 64px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    line-height: 64px;
    text-align: center;
    white-space: nowrap;
`;

const ContentHeader = styled.div`
    padding: 16px 24px 0;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
`;

const ContentTitle = styled.h1`
    font-size: 1.5rem;
`;

const StyledContent = styled(Content)`
    margin: 24px 24px 0 24px;
    padding: 24px;
    background: #fff;
    min-height: fit-content;
`;
export default MainLayout;
