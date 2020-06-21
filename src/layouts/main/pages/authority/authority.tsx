import React, { useState } from 'react';
import { Button, message } from 'antd';
import AuthorityTable from './components/authority-table';
import AuthorityForm from './components/authority-form';
import { Authority } from 'models/authority';

import styled from 'styled-components';

const AuthorityPage: React.FC = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [createdId, setCreatedId] = useState<number>();

    const saveHandler = (values: Authority) => {
        setFormVisible(false);
        setCreatedId(values.id);
        message.success('Save Succeed!');
    }


    return (
        <Container>
            <Condition>
                <Button type="primary" onClick={() => setFormVisible(true)}>Create New Authority</Button>
            </Condition>
            <AuthorityTable createdId={createdId} />
            <AuthorityForm visible={formVisible} onCancel={() => setFormVisible(false)} onSave={saveHandler} />
        </Container>
    )
}

const Container = styled.div`

`;

const Condition = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0 0 10px 0;
`;


export default AuthorityPage;