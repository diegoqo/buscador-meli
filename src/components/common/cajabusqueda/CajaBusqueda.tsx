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
        if(query){
            navigate(`/items?search=${query}`);
        }
    }

    return (
        <Box sx={{
            p:1, m:1, display: 'inline-flex', justifyContent: 'center', backgroundColor: '#fff159', width: 1300
        }}>
            <Box sx={{ marginRight: 5, ml: 30, mt: 1}}><img src={"https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.8/mercadolibre/logo__small@2x.png"}/></Box>
            <Box sx={{flexGrow: 3, mt: 1}}>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 800}}
                onSubmit={handleSubmit}
            >
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Buscar productos, marcas y más..."
                    onChange={onChange}
                    value={query}
                />
                <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon />
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
