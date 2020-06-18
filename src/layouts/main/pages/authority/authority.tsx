import React, { useState } from 'react';
import { Button, message } from 'antd';
import AuthorityTable from './components/authority-table';
import AuthorityForm from './components/authority-form';
import { Authority } from 'models/authority';
import styles from './authority.module.css';

const AuthorityPage: React.FC = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [createdId, setCreatedId] = useState<number>();

    const saveHandler = (values: Authority) => {
        setFormVisible(false);
        setCreatedId(values.id);
        message.success('Save Succeed!');
    }


    return (
        <div className={styles.container}>
            <div className={styles['condition-wrapper']}>
                <Button type="primary" onClick={() => setFormVisible(true)}>Create New Authority</Button>
            </div>
            <AuthorityTable createdId={createdId} />
            <AuthorityForm visible={formVisible} onCancel={() => setFormVisible(false)} onSave={saveHandler} />
        </div>
    )
}

export default AuthorityPage;