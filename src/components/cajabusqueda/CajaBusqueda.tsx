import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { IProductos, IResponseQuery } from '../../modelo/interfaces';


const CajaBusqueda = ({defaultQuery = ""}) => {
    const [query, setQuery] = useState(defaultQuery);
    const [results, setResults] = useState<IProductos>();
    const navigate = useNavigate();

    const updateQuery = async () => {
        if (query !== "") {
            const response = await axios.get('http://localhost:8080/search-description', {
                params: {query: query}
            });
            console.log(response.data.results.length)
            const resultsApi: IProductos = {
                author: {
                    name: 'Diego',
                    lastName: 'Quevedo'
                },
                categories: response.data.filters[0].values.map((vl: { name: string; }) => vl.name),
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
                })
            }
            setResults(resultsApi)
            navigate(`/items?search=${query}`);
            return resultsApi;
        }

    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateQuery();
    }

    return(
        <div>
            <div>Hola soy buscador</div>
            <form onSubmit={handleSubmit}>
                <input
                    type={'text'}
                    value={query}
                    onChange={onChange}
                />
                <button type={'submit'}>Buscar</button>
            </form>

        </div>

    );
}

CajaBusqueda.propTypes = {
    defaultQuery: PropTypes.string
}

export default CajaBusqueda;
