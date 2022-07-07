import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { Box, Grid } from '@mui/material';
import './Buscador.scss'
import CajaBusqueda from '../../common/cajabusqueda/CajaBusqueda';

const logo = require('../../../images/icon-services-fcs.png');

const Buscador = () => {

    useEffect(() => {
        localStorage.clear();
    }, []);


    return (
        <Box className={'buscador'} sx={{
            width: 1,
        }}>
            <>
                <Helmet>
                    <title>Busquedas</title>
                    <meta name="description" content="Página de búsquedas"/>
                    <meta name="robots" content="INDEX,FOLLOW"/>
                </Helmet>
                <CajaBusqueda key={'caja-busqueda'}/>
                <Grid className={'buscador__container-resultados'} container spacing={2}>
                    <Grid className={'buscador__container-imagen-buscador'} item xs={4}>
                        <img alt={'imagen-buscador'} className={'buscador__container-imagen-buscador--img'} src={logo}/>
                    </Grid>
                    <Grid className={'buscador__container-desc'} item xs={8}><h3>Escribí en el buscador lo que querés
                        encontrar.
                    </h3>
                        <ul>
                            <li><strong>Escribí tu búsqueda</strong> en el campo que figura en la parte superior de
                                la
                                pantalla.
                            </li>
                            <li><a href="/"> Navegá por categorías de productos</a> para encontrar el producto que
                                buscás.
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Box>
                </Box>
            </>
        </Box>
    );
}

export default Buscador;


