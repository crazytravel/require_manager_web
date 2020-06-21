import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginHeader: React.FC = () => {
    return (
        <Header><Link to="/" /></Header>
    )
}

const Header = styled.header`
    display: flex;
    flex-direction: row;
    background-color: #222;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
`;

export default LoginHeader;
