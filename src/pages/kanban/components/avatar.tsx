import React, { FC } from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { useFetch } from 'common/fetch-hook';

import { User } from 'models/user';
interface AvatarProps {
    userId: string;
}

const Avatar: FC<AvatarProps> = ({ userId }) => {
    const { loading, fetchedData } = useFetch<User>(`/api/v1/users/${userId}`);
    const buildIcon = (text?: string) => {
        if (!text) {
            return '';
        }
        return text.toUpperCase().substr(0, 1);
    };
    return (
        <Tooltip title={fetchedData?.nickname}>
            <Wrapper>{buildIcon(fetchedData?.nickname)}</Wrapper>
        </Tooltip>
    );
};

const Wrapper = styled.div`
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 50%;
    background-color: #dfe1e6;
    text-align: center;
    font-weight: 450;
`;
export default Avatar;
