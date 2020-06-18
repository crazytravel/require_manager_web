import React from 'react'
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { useSession } from '../../../contexts/session-context';
import styles from './kanban-header.module.css';

const AdminHeader = () => {
    const { logout, session } = useSession();
    const handleLogout = () => {
        logout();
    }
    return (
        <header className={styles['header-wrapper']}>
            <Link to="/"><h1 className={styles.logo}>需求管理平台</h1></Link>
            <div className={styles['menu-bar']}>
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item key="0"><Link to="/main/user"><EditOutlined /><span className={styles["header-menu-item"]}>Modify Password</span></Link></Menu.Item>
                        <Menu.Item key="1" onClick={handleLogout}><LogoutOutlined /><span>Logout</span></Menu.Item>
                    </Menu>
                } placement="bottomRight">
                    <span className={styles["dropdown-link"]}>
                        您好，{session.nickname} <DownOutlined />
                    </span>
                </Dropdown>
            </div>
        </header>
    )
}

export default AdminHeader;
