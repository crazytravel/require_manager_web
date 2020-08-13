import React from 'react';
import styled from 'styled-components';
import TopHeader from 'components/top-header';

const KanbanLayout: React.FC = (props) => {
    return (
        <Layout style={{ height: '100%' }}>
            <TopHeader />
            <Content>{props.children}</Content>
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

const Content = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export default KanbanLayout;
