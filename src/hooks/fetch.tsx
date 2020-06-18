import { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from '../config/network';
import HttpStatus from 'http-status-codes';

export function useFetch<T = undefined>(url: string, deps?: any[]) {
    const [loading, setLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState<T>();
    const [error, setError] = useState<T>();
    useEffect(() => {
        console.log('sending a http request to URL: ' + axios.defaults.baseURL! + url)
        setLoading(true);
        axios.get(url)
            .then(res => {
                if (res.status === HttpStatus.OK) {
                    setFetchedData(res.data);
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.error('error message: ', err);
                setError(err);
                message.error(err.message);
            })
            .then(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, ...(deps || [])]);
    return { loading, fetchedData, error };
}
