import { useEffect, useState } from 'react';
import axios from 'axios';
import { IDataResponseQuery } from "../modelo/interfaces";

const useFetchData = (url: string, paramsQuery = {}, query: string) => {
    const [response, setResponse] = useState<IDataResponseQuery>();
    const [errorPeticion, setErrorPeticion] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setErrorPeticion(false);
            setLoading(true);
            try {
                const { data } = await axios.get(url, {
                    params: {...paramsQuery}
                });
                setTimeout(() => {
                    setResponse(data);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error en useFetchData: ', error);
                setTimeout(() => {
                    setErrorPeticion(true);
                    setLoading(false);
                }, 1000);
            }
        };

        fetchData();
    }, [query]);

    return {
        response,
        errorPeticion,
        loading
    };
};

export default useFetchData;
