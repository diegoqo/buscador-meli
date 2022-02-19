import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CajaBusqueda.scss'
import { Box } from '@mui/material';

const CajaBusqueda = ({defaultQuery = ""}) => {

    const [query, setQuery] = useState(defaultQuery);
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/items?search=${query}`);
    }

    return (
        <Box display={'flex'} p={1}>
            <Box p={1} flexShrink={1}><a className="nav-logo" href="/" tabIndex={0} /></Box>
            <Box p={1} width={'90%'}><form onSubmit={handleSubmit}>
                <input
                    type={'text'}
                    value={query}
                    onChange={onChange}
                />
                <button type={'submit'}>Buscar</button>
            </form></Box>
        </Box>

    );
}

CajaBusqueda.propTypes = {
    defaultQuery: PropTypes.string
}

export default CajaBusqueda;
