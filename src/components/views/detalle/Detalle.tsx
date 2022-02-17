import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CajaBusqueda from '../../cajabusqueda/CajaBusqueda';
import axios from 'axios';
import { IProductos, IResponseQuery } from '../../../modelo/interfaces';


const Detalle = () => {
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8080/search-item', {
            params: {id: id}
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
        })
    }, [id]);

    return(
        <>
            <div>Hola soy detalle</div>
            <CajaBusqueda />
            <p>id es: {id}</p>
        </>

    );
}


export default Detalle;
