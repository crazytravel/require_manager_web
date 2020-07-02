import React, { useState, useEffect } from 'react'
import { Dropdown, Menu, Tooltip, Button, message } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FundOutlined, SettingOutlined, AppstoreOutlined, DownOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useSession } from 'contexts/session-context';
import styled from 'styled-components';
import { Config } from 'config/config';
import { ClickParam } from 'antd/lib/menu';


const Toolbar = () => {
    const { pathname } = useLocation();
    let currentPath = pathname.substring(pathname.indexOf('/') + 1);
    if (currentPath !== 'kanban') {
        currentPath = 'main';
    }
    console.log(currentPath)
    useEffect(() => {
        let currentPath = pathname.substring(pathname.indexOf('/') + 1);
        if (currentPath !== 'kanban') {
            currentPath = 'main';
        }
        setCurrentPage(currentPath);
    }, [pathname]);
    const { logout, session } = useSession();
    const [currentPage, setCurrentPage] = useState<string>(currentPath);
    const handleLogout = () => {
        logout();
    }
    const handleProjectClick = (e: ClickParam) => {
        console.log('click', e);
    }

    const handleMenuClick = (e: ClickParam) => {
        setCurrentPage(e.key);
    }

    const menu = (
        <Menu onClick={handleProjectClick}>
            <Menu.Item key="1">
                1st menu item
          </Menu.Item>
            <Menu.Item key="2">
                2nd menu item
          </Menu.Item>
            <Menu.Item key="3">
                3rd item
          </Menu.Item>
        </Menu>
    );

    return (
        <Subtitle>
            <Menu onClick={handleMenuClick} selectedKeys={[currentPage]} mode="horizontal">
                <Menu.Item key="kanban" icon={<FundOutlined />}>
                    <Link to="/kanban">看板</Link>
                </Menu.Item>
                <Menu.Item key="main" icon={<AppstoreOutlined />}>
                    <Link to="/main">系统管理</Link>
                </Menu.Item>
            </Menu>
            <MenuContainer>
                {currentPage === 'kanban' ?
                    <>
                        <Title>纽扣资源管理项目</Title>
                        <Dropdown overlay={menu}>
                            <Button>更换项目 <DownOutlined /></Button>
                        </Dropdown>
                    </>
                    : ''}

            </MenuContainer>
            {/* <ToolContainer>
                <LinkBtn to="/kanban">
                    <Tooltip placement="bottom" title="Ask for Support">
                        <FundOutlined style={{ fontSize: '2rem', color: 'rgba(0, 0, 0, 0.65)' }} />
                    </Tooltip>
                    看板
                </LinkBtn>
                <LinkBtn to="/main">
                    <Tooltip placement="bottom" title="Ask for Support">
                        <SettingOutlined style={{ fontSize: '2rem', color: 'rgba(0, 0, 0, 0.65)' }} />
                    </Tooltip>
                    设置
                </LinkBtn>
            </ToolContainer> */}

        </Subtitle>
    )
}

const Subtitle = styled.div`
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    z-index: 10;
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Title = styled.h3`
    margin: 0 10px 0 0;
    padding: 0;
`;

const ToolContainer = styled.div`
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

const LinkBtn = styled(Link)`
    margin-left: 20px;
    color: rgba(0, 0, 0, 0.65);
`;

export default Toolbar;
