import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CajaBusqueda from '../../cajabusqueda/CajaBusqueda';
import axios from 'axios';
import { IProductos, IResponseQuery } from '../../../modelo/interfaces';
import MigaDePan from '../../migadepan/MigaDePan';


function useQuery(queryParam: string) {
    const [searchParams] = useSearchParams();

    return useMemo(() => searchParams.get(queryParam), [queryParam]);
}

const Productos = () => {
    const query = useQuery('search');
    const [results, setResults] = useState<IProductos>();
    const navigate = useNavigate();

    const calcularDecimal = (amount: number) => {
        const amountSplit: string[] = amount.toString().split('.');
        return amountSplit.length > 1
            ? validarDecimal(amountSplit[1])
            : '00'
    }

    const validarDecimal = (decimal: string) => {
        return (decimal.length == 1 ? decimal.concat('0') : decimal).substring(0, 1);
    }

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
                categories: response.data.filters[0]?.values[0]?.path_from_root.map((categorias: { id: string, name: string }) => {
                    return {
                        id: categorias?.id,
                        nombre: categorias?.name
                    }
                }),
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
                                decimals: calcularDecimal(res.prices?.prices[0].amount)
                            }
                        }
                    },
                )
            }
            localStorage.setItem('categorias', JSON.stringify(resultsApi?.categories))
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
            {results !== undefined && results.items && results.items?.length > 0 && results.items?.length > 0 &&
                <>
                    {results?.categories !== undefined && results?.categories?.length > 0 &&
                        <MigaDePan categorias={results?.categories}/>}
                    {results?.items.slice(0, 4).map(it =>
                        <>
                            <a onClick={() => handleDetail(it.id)}>
                                <div><p>{it.id}</p></div>
                            </a>
                        </>
                    )}
                </>}
        </>

    );
}


export default Productos;
