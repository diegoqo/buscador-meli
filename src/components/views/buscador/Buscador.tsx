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
        <Box>
            <><Helmet>
                <title>Busquedas</title>
                <meta name="description" content="Página de búsquedas"/>
                <meta name="robots" content="INDEX,FOLLOW"/>
            </Helmet>
                <CajaBusqueda key={'caja-busqueda'}/>
                <Box className={'container-info-busqueda'}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}><img className={'img-buscador'} src={logo}/></Grid>
                        <Grid className={'container-desc-buscador'} item xs={8}><h3>Escribí en el buscador lo que querés
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
                </Box>
            </>
        </Box>


    );
}

export default Buscador;


