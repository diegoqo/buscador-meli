import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { IProductos, IResponseQuery } from '../../modelo/interfaces';

const CajaBusqueda = ({defaultQuery= ""}) => {

    const [query, setQuery] = useState(defaultQuery);
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/items?search=${query}`);
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
