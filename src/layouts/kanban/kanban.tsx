import React from 'react';
import { Card, Row, Col, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined, LoadingOutlined } from '@ant-design/icons';

import { useFetch } from 'hooks/fetch';
import StorageImg from 'components/storage-img';
import { Subsystem } from 'models/subsystem';
import styles from './kanban.module.css';
import devopsImg from 'assets/images/cover-devops.jpg';
import AdminHeader from './components/kanban-header';

const { Meta } = Card;



const AdminLayout: React.FC = props => {

    const { loading, fetchedData } = useFetch<Subsystem[]>('/api/v1/subsystems/')

    return (
        <div className={styles.container}>
            <AdminHeader />
            <div className={styles.content}>
                <div className={styles['subtitle']}>
                    <h1>Welcome back to Require Manager</h1>
                    <Link to="/admin/support">
                        <Tooltip placement="bottom" title="Ask for Support">
                            <QuestionCircleOutlined style={{ fontSize: '2rem', color: 'rgba(0, 0, 0, 0.65)' }} />
                        </Tooltip>
                    </Link>
                </div>
                <div className={styles['card-wrapper']}>
                    <Row>
                        <Col style={{ marginRight: 30, marginTop: 30 }} key="-1">
                            <Tooltip placement="bottom" title="require manager">
                                <Link to="/main">
                                    <Card
                                        hoverable
                                        bordered={false}
                                        style={{ width: 320, textAlign: 'center', overflow: 'hidden' }}
                                        cover={
                                            <img style={{ height: 150, objectFit: "cover" }} src={devopsImg} alt="DevOps" />
                                        }
                                    >
                                        <Meta title="DevOps Portal" className={styles['card-content']} />
                                    </Card>
                                </Link>
                            </Tooltip>
                        </Col>
                        {loading ? <Loading /> : fetchedData?.map(item => {
                            return (
                                <Col style={{ marginRight: 30, marginTop: 30 }} key={item.id}>
                                    <Tooltip placement="bottom" title={item.description}>
                                        <a href={item.url}>
                                            <Card
                                                hoverable
                                                bordered={false}
                                                style={{ width: 320, textAlign: 'center', overflow: 'hidden' }}
                                                cover={
                                                    <StorageImg style={{ height: 150, objectFit: "cover" }} mediaId={item.media_id} alt={item.name} />
                                                }
                                            >
                                                <Meta title={item.name} className={styles['card-content']} />
                                            </Card>
                                        </a>
                                    </Tooltip>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
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