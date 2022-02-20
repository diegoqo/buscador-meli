import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PropTypes from 'prop-types';
import { ICategorias } from '../../../modelo/interfaces';

const MigaDePan = ({categorias} : {categorias: ICategorias[]}) => {

    const navigate = useNavigate();

    const redirigir = (name: string) => {
        navigate(`/items?search=${name}`);
    }

    const breadcrumbs = categorias.map((categoria: ICategorias, index) => {
       return index !== categorias.length - 1 ? <Link underline="hover" key={index + 1} color="inherit" onClick={() => redirigir(categoria?.nombre)}>
           {categoria.nombre}
        </Link> : <Typography key={index + 1} color="text.primary">
           {categoria.nombre}
        </Typography>
    });

    return(
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
MigaDePan.propTypes = {
    categorias: PropTypes.array.isRequired
}

export default MigaDePan;
