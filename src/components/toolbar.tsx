import React from 'react'
import { Dropdown, Menu,Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { useSession } from 'contexts/session-context';
import styled from 'styled-components';
import { Config } from 'config/config';

const Toolbar = () => {
    const { logout, session } = useSession();
    const handleLogout = () => {
        logout();
    }
    return (
        <Subtitle>
            <h3>KANBAN</h3>
            <Link to="/main">
                <Tooltip placement="bottom" title="Ask for Support">
                    <SettingOutlined style={{ fontSize: '2rem', color: 'rgba(0, 0, 0, 0.65)' }} />
                </Tooltip>
            </Link>
        </Subtitle>
    )
}

const Subtitle = styled.div`
    background-color: #fff;
    height: 5rem;
    line-height: 5rem;
    padding: 0 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    z-index: 10;
`;


export default Toolbar;
