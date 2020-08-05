import React from 'react'
import { Dropdown, Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { LogoutOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { useSession } from 'common/session-context';
import styled from 'styled-components';
import { Config } from 'common/config';
import { Routes } from 'common/routes';

const TopHeader = () => {
    const history = useHistory();
    const { logout, session } = useSession();
    const handleLogout = () => {
        logout();
    }
    const handleProfile = () => {
        history.push(Routes.main.routes.user.path);
    }
    return (
        <Header>
            <Link to="/"><TextLogo>{Config.PROJECT_NAME}</TextLogo></Link>
            <Dropdown overlay={
                <Menu>
                    <Menu.Item key="0" onClick={handleProfile}><UserOutlined /><span>个人信息</span></Menu.Item>
                    <Menu.Item key="1" onClick={handleLogout}><LogoutOutlined /><span>登出</span></Menu.Item>
                </Menu>
            } placement="bottomRight">
                <DropdownLink>
                    您好，{session.nickname} <DownOutlined />
                </DropdownLink>
            </Dropdown>
        </Header>
    )
}

const Header = styled.header`
    display: flex;
    flex-direction: row;
    background-color: #222;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    color: #fff;
`;

const TextLogo = styled.h1`
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-size: 2.5rem;
    color: #fff;
`;

const DropdownLink = styled.span`
    cursor: pointer;
    font-size: 1.5rem;
    :hover {
        color: #1890ff;
    }
`;

export default TopHeader;
