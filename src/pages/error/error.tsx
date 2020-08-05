import React from 'react';
import styled from 'styled-components';

export interface ErrorPageProps {
    code: number,
    message: string,
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, message }) => {
    return (
        <Content>
            <h1>{code}</h1>
            <h3>
                {message}
            </h3>
        </Content>
    )
}

const Content = styled.div`
    width: 100%;
    margin: 0 auto;
    padding-top: 5rem;
    text-align: center;
`;

export default ErrorPage;