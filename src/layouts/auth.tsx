import React from 'react';
import styled from 'styled-components';
import bgImg from 'assets/images/cover-login.jpg';

const SignContainer: React.FC = props => {

    return (
        <Container>
            <Content>
                <Title>需求管理系统</Title>
                <SubTitle>本系统可以管理软件开发中的需求</SubTitle>
                <div>{props.children}</div>
            </Content>
        </Container>
    )
}


const Container = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${bgImg});
    background-size: cover;
    background-position: left;
    background-repeat: no-repeat;
    background-color: #000000;
`;

const Content = styled.div`
    padding-top: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: #ffffff;
    font-size: 3rem;
`;

const SubTitle = styled.p`
    color: #ffffff;
    font-size: 1.2rem;
    margin-bottom: 5rem;
`;


export default SignContainer;