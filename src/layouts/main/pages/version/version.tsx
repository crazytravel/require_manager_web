import React, { useState } from 'react';
import { Row, Col, Radio, Button, message } from 'antd';
import VersionCard from './components/version-card';
import VersionForm from './components/version-form';
import VersionTable from './components/version-table';
import { VersionData } from 'models/version';
import styles from './version.module.css';
import { RadioChangeEvent } from 'antd/lib/radio';


const UpgradePage: React.FC = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [createdId, setCreatedId] = useState<string>();

    const [platform, setPlatform] = useState<'mbapp' | 'oneapp'>('mbapp');
    const [os, setOs] = useState<'ios' | 'android'>('ios');

    const platformHandler = (e: RadioChangeEvent) => {
        setPlatform(e.target.value);
    }

    const osHandler = (e: RadioChangeEvent) => {
        setOs(e.target.value);
    }

    const clickHandler = (record: VersionData) => {
    }

    const saveHandler = (values: VersionData) => {
        const version = values.version;
        console.log(version);
        setFormVisible(false);
        setCreatedId(values.id);
        message.success('Save Succeed!');
    }
    return (
        <div className={styles.container}>
            <Row gutter={16}>
                <Col span={6}><VersionCard platform='mbapp' os="ios" /></Col>
                <Col span={6}><VersionCard platform='mbapp' os="android" /></Col>
                <Col span={6}><VersionCard platform='oneapp' os="ios" /></Col>
                <Col span={6}><VersionCard platform='oneapp' os="android" /></Col>
            </Row>
            <div className={styles['search-condition-wrapper']}>
                <div>
                    <label className={styles.label}>Platform:</label>
                    <Radio.Group onChange={platformHandler} value={platform}>
                        <Radio value='oneapp'>OneApp</Radio>
                        <Radio value='mbapp'>MBApp</Radio>
                    </Radio.Group>
                    <label className={styles.label}>OS:</label>
                    <Radio.Group onChange={osHandler} value={os}>
                        <Radio value='ios'>iOS</Radio>
                        <Radio value='android'>Android</Radio>
                    </Radio.Group>
                </div>
                <Button type="primary" onClick={() => setFormVisible(true)}>Post a new version</Button>
            </div>
            <VersionTable os={os} platform={platform} createdId={createdId} onRowClick={clickHandler} />
            <VersionForm visible={formVisible} onCancel={() => setFormVisible(false)} onSave={saveHandler} />
        </div>
    )
}

export default UpgradePage;