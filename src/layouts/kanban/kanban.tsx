import React from 'react';
import { Card, Row, Col, Tooltip, Button } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined, LoadingOutlined } from '@ant-design/icons';

import { useFetch } from 'hooks/fetch';
import StorageImg from 'components/storage-img';
import { Subsystem } from 'models/subsystem';
import styles from './kanban.module.css';

import AdminHeader from './components/kanban-header';
import CardContainer from './components/card-container';
import DragCard from './components/drag-card';
import AddButton from './components/add-button';

const { Meta } = Card;



const AdminLayout: React.FC = props => {

    const { loading, fetchedData } = useFetch<Subsystem[]>('/api/v1/subsystems/')


    return (
        <div className={styles.container}>
            <AdminHeader />
            <div className={styles['subtitle']}>
                <h3>KANBAN</h3>
                <Link to="/main">
                    <Tooltip placement="bottom" title="Ask for Support">
                        <SettingOutlined style={{ fontSize: '2rem', color: 'rgba(0, 0, 0, 0.65)' }} />
                    </Tooltip>
                </Link>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <CardContainer title="代办">
                        <Link to="/main"><DragCard /></Link>
                        <Link to="/main"><DragCard /></Link>
                        <Link to="/main"><DragCard /></Link>
                    </CardContainer>
                    <CardContainer title="开发中">
                        <Link to="/main"><DragCard /></Link>
                    </CardContainer>
                    <CardContainer title="已完成">
                        <Link to="/main"><DragCard /></Link>
                    </CardContainer>
                </div>
                <Button type="dashed" style={{width: 250, height: 40, marginLeft: 10}}> + 创建新列表</Button>
            </div>
        </div >
    )
}

const Loading = () => {
    return (
        <div className={styles['loading-container']}>
            <span><LoadingOutlined /></span>
        </div>
    )
}


export default AdminLayout;