import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useFetch } from '../hooks/fetch';

interface StorageImgProps {
    mediaId: string,
    alt?: string,
    style?: object,
}

interface FetchRes {
    id: string,
    fileAccessUrl: string,
    fileName: string
}

const StorageImg: React.FC<StorageImgProps> = ({ mediaId, alt, style }) => {
    const { loading, fetchedData } = useFetch<FetchRes>('/storage/api/v1/files/' + mediaId);
    return loading ? <LoadingOutlined /> : <img src={fetchedData?.fileAccessUrl} style={style} alt={alt} />
}

export default StorageImg;