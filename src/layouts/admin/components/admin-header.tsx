import React from 'react'
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { useSession } from '../../../contexts/session-context';
import styles from './admin-header.module.css';

const AdminHeader = () => {
    const { logout, session } = useSession();
    const handleLogout = () => {
        logout();
    }
    return (
        <header className={styles['header-wrapper']}>
            {/* <Link to="/"><img className={styles.logo} src={logoImg} alt="require manager" /></Link> */}
            <div className={styles['menu-bar']}>
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item key="0"><Link to="/main/user"><EditOutlined /><span className={styles["header-menu-item"]}>Modify Password</span></Link></Menu.Item>
                        <Menu.Item key="1" onClick={handleLogout}><LogoutOutlined /><span>Logout</span></Menu.Item>
                    </Menu>
                } placement="bottomRight">
                    <span className={styles["dropdown-link"]}>
                        Hello, {session.nickname} <DownOutlined />
                    </span>
                </Dropdown>
            </div>
        </header>
    )
}

export default AdminHeader;
