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
import styles from './main-header.module.css';
import { Link } from 'react-router-dom';
import { useSession } from '../../../contexts/session-context';

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
        <Header className={styles.header}>
            <span className={styles.trigger} onClick={clickHandler}>
                {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </span>
            <div className={styles["header-fun-wrapper"]}>
                <span className={styles.trigger}><Link style={{ color: 'rgba(0, 0, 0, 0.65)' }} to="/"><HomeOutlined /></Link></span>
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item key="0"><Link to="/main/user"><UserOutlined /><span className={styles["header-menu-item"]}>Profile</span></Link></Menu.Item>
                        <Menu.Item key="1"><Link to="/main/setting"><SettingOutlined /><span className={styles["header-menu-item"]}>Settings</span></Link></Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="3" onClick={handleLogout}><LogoutOutlined /><span>Logout</span></Menu.Item>
                    </Menu>
                } placement="bottomRight">
                    <span className={styles["dropdown-link"]}>
                        {session.nickname} <DownOutlined />
                    </span>
                </Dropdown>
            </div>
        </Header >
    );
}

export default MainHeader;