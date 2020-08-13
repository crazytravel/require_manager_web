import React from 'react';
import styled from 'styled-components';

import TopHeader from 'components/top-header';
import Toolbar from 'components/toolbar';
import MainMenu from 'components/main-menu';
import { generateMenu } from 'common/menu-config';
import { MainRoutes } from 'common/routes';

const MainLayout: React.FC = () => {
    return (
        <Layout>
            <TopHeader />
            <Toolbar />
            <Container>
                <Sidebar>
                    <MainMenu menuData={generateMenu()} />
                </Sidebar>
                <Wrapper>
                    <Content>
                        <MainRoutes />
                    </Content>
                </Wrapper>
            </Container>
        </Layout>
    );
};

const Layout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Container = styled.div`
    flex: 1;
    height: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #f5f7f9;
`;
const Sidebar = styled.div`
    width: 200px;
    min-width: 200px;
    max-width: 200px;
`;

const Wrapper = styled.div`
    flex: 1;
    width: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const Content = styled.div`
    background-color: #fff;
    margin: 15px;
    padding: 15px;
    overflow-x: auto;
    overflow-y: hidden;
    flex: 1;
    height: 0;
`;
export default MainLayout;
