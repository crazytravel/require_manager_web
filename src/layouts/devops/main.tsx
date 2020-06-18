import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Breadcrumb } from 'antd';
import MainHeader from './components/main-header';
import styles from './main.module.css';
import MainMenu, { MenuItem } from './components/menu';
import { menuData } from '../../config/menu';
import { MainRoutes } from '../../config/routes';

const { Sider, Content, Footer } = Layout;

const MainLayout: React.FC = () => {

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<MenuItem>();

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider breakpoint="sm"
                // collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.logo}>{collapsed ? '需求' : '需求管理系统'}</div>
                <MainMenu menuData={menuData} selectCallback={item => {
                    setSelectedMenu(item);
                }} />
            </Sider>
            <Layout>
                <MainHeader onToggleClick={(collapsedParam) => setCollapsed(collapsedParam)} />
                <div className={styles['content-header']}>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/main/welcome">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>{selectedMenu?.text}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className={styles['content-title']}>{selectedMenu?.text}</h1>
                </div>
                <Content className={styles.content}>
                    <MainRoutes />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Require Manager @ 2020</Footer>
            </Layout>
        </Layout>
    );
}
export default MainLayout;
