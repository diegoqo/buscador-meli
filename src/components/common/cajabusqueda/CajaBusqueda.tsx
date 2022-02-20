import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CajaBusqueda.scss'
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CajaBusqueda = ({defaultQuery = ""}) => {

    const [query, setQuery] = useState("");
    useEffect(() => {
        setQuery(defaultQuery)
    }, [defaultQuery]);

    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query) {
            navigate(`/items?search=${query}`);
        }
    }

    return (
        <Box className={'container-caja-busqueda'}>
            <Box className={'container-img-buscador'}><img
                src={"https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.8/mercadolibre/logo__small@2x.png"}/></Box>
            <Box className={'container-input-buscador'}>
                <Paper
                    component="form"
                    className={'paper-input-buscador'}
                    onSubmit={handleSubmit}
                >
                    <InputBase
                        className={'input-buscador'}
                        placeholder="Buscar productos, marcas y más..."
                        onChange={onChange}
                        value={query}
                        data-testid={'input-busqueda'}
                    />
                    <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
            </Box>
        </Box>

    );
}

CajaBusqueda.propTypes = {
    defaultQuery: PropTypes.string
}

export default CajaBusqueda;
