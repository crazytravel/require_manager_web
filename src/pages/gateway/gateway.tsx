import React from 'react';
import { Table, Button } from 'antd';
import { useFetch } from '../../hooks/fetch';

interface FetchRes {
    data: any[]
}

const GatewayPage: React.FC = () => {

    // const { loading, fetchedData } = useFetch('/mock/gateway.json')
    const { loading, fetchedData } = useFetch<FetchRes>('/api-gateway/services')

    const handleDetailAction = (id: string) => {

    }

    return (
        <Table
            columns={[
                { title: '#', key: 'number', render: (text, record, index) => index + 1 },
                { title: 'name', key: 'name', dataIndex: 'name' },
                { title: 'protocol', key: 'protocol', dataIndex: 'protocol' },
                { title: 'host', key: 'host', dataIndex: 'host' },
                { title: 'port', key: 'port', dataIndex: 'port' },
                { title: 'path', key: 'path', dataIndex: 'path' },
                {
                    title: 'Action', key: 'action',
                    render: (text, record) => <Button onClick={() => handleDetailAction(record.id)} type="link">Detail</Button>
                },
            ]}
            rowKey={record => record.id}
            dataSource={fetchedData?.data.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1)}
            pagination={false}
            loading={loading}
        />
    )
}

export default GatewayPage;