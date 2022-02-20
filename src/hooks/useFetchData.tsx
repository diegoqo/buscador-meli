import { useEffect, useState } from 'react';
import axios from 'axios';
import { IDataResponseQuery } from "../modelo/interfaces";

const useFetchData = (url: string, paramsQuery = {}, query: string) => {
    const [response, setResponse] = useState<IDataResponseQuery>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(url, {
                    params: {...paramsQuery}
                });
                setResponse(data);
            } catch (error) {
                console.error('Error en useFetchData: ', error)
            }
        };

        fetchData();
    }, [query]);

    return {
        response
    };
};

export default useFetchData;
