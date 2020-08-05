import React from 'react';
import { Card, Row, Col } from 'antd';
import { AppleFilled, AndroidFilled } from '@ant-design/icons';
import { useFetch } from 'common/fetch-hook';
import { VersionData } from 'models/version';

interface VersionCardProps {
    os: 'ios' | 'android';
    platform: 'oneapp' | 'mbapp';
}

const VersionCard: React.FC<VersionCardProps> = props => {

    const cardTitle = <span>{props.platform} {props.os === 'ios' ? <AppleFilled /> : <AndroidFilled />} current version </span>

    const { loading, fetchedData } = useFetch<VersionData>(`/api/v1/versions/current?os=${props.os}&platform=${props.platform}`)

    return (
        <Card type="inner" title={cardTitle} loading={loading} >
            <Row>
                <Col span={12}>Version: <span style={{ fontWeight: 'bold' }}>{fetchedData?.version}</span>  </Col>
                <Col span={12}>Mandatory: {fetchedData?.mandatory ? 'YES' : 'NO'}</Col>
            </Row>
            <Row><Col span={24}>Update title: {fetchedData?.updateTitle}</Col></Row>
            <Row><Col span={24}>Update content: {fetchedData?.updateContent}</Col></Row>
        </Card>
    )
}

export default VersionCard;