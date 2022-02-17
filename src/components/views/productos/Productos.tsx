import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CajaBusqueda from '../../cajabusqueda/CajaBusqueda';
import axios from 'axios';
import { IItem, IProductos, IResponseQuery } from '../../../modelo/interfaces';


function useQuery(queryParam: string) {
    const [searchParams] = useSearchParams();

    return useMemo(() => searchParams.get(queryParam), [queryParam]);
}

const Productos = () => {
    const query = useQuery('search');
    const [results, setResults] = useState<IProductos>();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/search', {
            params: {query: query}
        }).then(response => {
            console.log(response.data.results.length)
            const resultsApi: IProductos = {
                author: {
                    name: 'Diego',
                    lastName: 'Quevedo'
                },
                categories: response.data.filters[0]?.values.map((vl: { name: string; }) => vl.name),
                items: response.data.results.map((res: IResponseQuery) => {
                    return {
                        id: res?.id,
                        title: res?.title,
                        picture: res?.thumbnail,
                        condition: res?.condition,
                        free_shipping: res?.shipping?.free_shipping,
                        price: {
                            currency: res.prices?.prices[0].currency_id,
                            amount: res.prices?.prices[0].amount,
                            decimals: res.prices?.prices[0].decimals
                        }
                    }
                },
                     )
            }
            setResults(resultsApi)
            return resultsApi;
        })
    }, [query]);

    const handleDetail = (idProducto: string) => {
        navigate(`/items/${idProducto}`);
    }

    return (
        <>
            <div>Hola soy Productos</div>
            <CajaBusqueda defaultQuery={query || ''}/>
            {results !== undefined && results.items && results.items?.length > 0 && results.items?.length > 0 && results?.items.slice(0,4).map(it =>
                <>
                    <a onClick={() => handleDetail(it.id)}><div><p>{it.id}</p></div></a>
                </>
            )}
        </>

    );
}


export default Productos;
