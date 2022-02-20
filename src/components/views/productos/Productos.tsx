import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CajaBusqueda from '../../common/cajabusqueda/CajaBusqueda';
import { IItem, IProductos } from '../../../modelo/interfaces';
import MigaDePan from '../../common/migadepan/MigaDePan';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Productos.scss'
import useFetchData from '../../../hooks/useFetchData';
import { ConstructorProductos } from '../../../utils/ConstructoresInterfaces';
import { FormatearPrecio } from '../../../utils/Formateador';

const R = require('ramda');

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const Productos = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search');
    const [results, setResults] = useState<IProductos>();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const {
        response
    } = useFetchData('http://localhost:8080/search', {query: query});

    useEffect(() => {
        const resultsApi: IProductos = ConstructorProductos(R.pathOr([], [], response));
        localStorage.setItem('categorias', JSON.stringify(resultsApi?.categories))
        setTimeout(() => {
            setResults(resultsApi)
            setLoading(false)
        }, 1000);

    }, [query, response]);

    const handleDetail = (idProducto: string) => {
        navigate(`/items/${idProducto}`);
    }

    return (
        <Box>
            <CajaBusqueda defaultQuery={R.pathOr('', [], query)}/>
            {loading && <Box>
                <CircularProgress/>
            </Box>}
            {R.pathOr([], ['items'], results).length > 0 &&
                <>
                    {R.pathOr([], ['categories'], results).length > 0 &&
                        <Box className={'container-miga'}><MigaDePan categorias={R.pathOr([], ['categories'], results)}/></Box>}
                    {R.pathOr([], ['items'], results).slice(0, 4).map((it: IItem) =>
                        <>
                            <Paper className={'container-grilla'}
                                key={`${it.id}-paper`}
                            ><a className={'href-grid'} onClick={() => handleDetail(it.id)} key={`${it.id}-a`}>
                                <Grid container spacing={2} key={`${it.id}-grid-img-container`}>
                                    <Grid item className={'container-img-producto'} key={`${it.id}-grid-img`}>
                                        <Img alt="complex" src={it.picture} key={`${it.id}-img`}/>
                                    </Grid>
                                    <Grid item xs={12} sm container className={'container-desc-prod'}
                                          key={`${it.id}-grid-desc-container`}>
                                        <Grid item xs container direction="column" spacing={2}
                                              key={`${it.id}-grid-desc`}>
                                            <Grid item xs key={`${it.id}-grid-desc-xs`}>
                                                <Typography gutterBottom variant="subtitle1" component="div"
                                                            key={`${it.id}-grid-typo-sub`}>
                                                    {FormatearPrecio(R.pathOr('ARS', ['price', 'currency'], it), R.pathOr(0, ['price', 'amount'], it))}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom
                                                            key={`${it.id}-grid-typo-title`}>
                                                    {it.title}
                                                </Typography>
                                                {it.free_shipping &&
                                                    <Typography variant="body2" color="text.secondary"
                                                                key={`${it.id}-grid-typo-shipp`}>
                                                        Envío gratis
                                                    </Typography>}
                                            </Grid>
                                        </Grid>
                                        <Grid item key={`${it.id}-grid-condition`}>
                                            <Typography variant="subtitle1" component="div"
                                                        key={`${it.id}-grid-typo-condition`}>
                                                {it.condition}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </a>
                            </Paper>
                        </>
                    )}
                </>}
        </Box>
    );
}


export default Productos;
