import React from 'react'
import { MailOutlined } from '@ant-design/icons';
import styles from './support.module.css';
import AdminHeader from './components/kanban-header';

const Support = () => {
    return (
        <div>
            <AdminHeader />
            <div className={styles.container}>
                <h1>Support Center</h1>
                <div className={styles.wrapper}>
                    <p><MailOutlined className={styles.icon} /><span className={styles.text} >wangshuo159@126.com</span></p>
                    {/* <p><PhoneOutlined className={styles.icon} /><span className={styles.text}></span></p> */}
                </div>
            </div>
        </div>

    )
}

export default Support;