import React from 'react';
import styled from 'styled-components';

const WelcomePage: React.FC = () => {
    return <Content>欢迎进入需求管理系统</Content>;
};

const Content = styled.h1`
    text-align: center;
    font-size: 20px;
`;

export default WelcomePage;
