import React, { useState } from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    DownOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSession } from 'contexts/session-context';

import styled from 'styled-components';

const { Header } = Layout;

interface MainHeaderProps {
    onToggleClick: (collapsed: boolean) => void;
}

const MainHeader: React.FC<MainHeaderProps> = props => {

    const [collapsed, setCollapsed] = useState(true);

    const { logout, session } = useSession();

    const clickHandler = () => {
        setCollapsed(!collapsed);
        props.onToggleClick(collapsed);
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <StyledHeader>
            <FoldTrigger onClick={clickHandler}>
                {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </FoldTrigger>
            <FuncHeader>
                <FoldTrigger><Link style={{ color: 'rgba(0, 0, 0, 0.65)' }} to="/"><HomeOutlined /></Link></FoldTrigger>
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item key="0"><Link to="/main/user"><UserOutlined /><MenuItemText>Profile</MenuItemText></Link></Menu.Item>
                        <Menu.Item key="1"><Link to="/main/setting"><SettingOutlined /><MenuItemText>Settings</MenuItemText></Link></Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="3" onClick={handleLogout}><LogoutOutlined /><span>Logout</span></Menu.Item>
                    </Menu>
                } placement="bottomRight">
                    <DropdownText>{session.nickname} <DownOutlined /></DropdownText>
                </Dropdown>
            </FuncHeader>
        </StyledHeader>
    );
}

const StyledHeader = styled(Header)`
    display: flex;
    z-index: 10;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
`;

const FoldTrigger = styled.span`
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    :hover {
        color: #1890ff;
    }
`;

const FuncHeader = styled.div`
    display: flex;
    line-height: 64px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 24px;
`;

const MenuItemText = styled.span`
    padding: 0 24px 0 6px;
`;

const DropdownText = styled.span`
    color: #1890ff;
`;
export default MainHeader;