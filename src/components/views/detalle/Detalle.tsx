import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CajaBusqueda from '../../common/cajabusqueda/CajaBusqueda';
import { ICategorias, IProductos } from '../../../modelo/interfaces';
import MigaDePan from '../../common/migadepan/MigaDePan';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Detalle.scss'
import useFetchData from '../../../hooks/useFetchData';
import { ConstructorProductoDetalle1, ConstructorProductoDetalle2 } from '../../../utils/ConstructoresInterfaces';
import { FormatearPrecio } from '../../../utils/Formateador';
import Helmet from 'react-helmet';

const R = require('ramda');

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Detalle = () => {
    const {id} = useParams();
    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const [productoDetalle1, setProductoDetalle1] = useState<IProductos>();
    const [productoDetalle, setProductoDetalle] = useState<IProductos>();
    const urlServer = process.env.REACT_APP_API_URL;

    const {
        response: responseDetalle1
    } = useFetchData(`${urlServer}/search-item`, {id: id}, R.pathOr('', [], id));

    const {
        response: responseDetalle2
    } = useFetchData(`${urlServer}/search-description`, {id: id}, R.pathOr('', [], id));

    useEffect(() => {
        if (responseDetalle1) {
            const detalle1: IProductos = ConstructorProductoDetalle1(responseDetalle1);
            setProductoDetalle1(detalle1);
        }

    }, [responseDetalle1]);

    useEffect(() => {
        const productoConDescripcion: IProductos = ConstructorProductoDetalle2(R.pathOr([], [], productoDetalle1), R.pathOr([], [], responseDetalle2));
        const categoriasLocalStorage = localStorage.getItem('categorias');
        const categoriasLst: ICategorias[] = R.pathOr([], [], categoriasLocalStorage).length > 0
            ? Array.from(JSON.parse(R.pathOr([], [], categoriasLocalStorage)))
            : [];
        const categoriaEncontrada = R.find(R.propEq('id', productoConDescripcion?.item?.category))(categoriasLst);

        if (categoriaEncontrada) {
            setCategorias([categoriaEncontrada, {
                id: R.pathOr('', ['item', 'id'], productoConDescripcion),
                nombre: R.pathOr('', ['item', 'title'], productoConDescripcion),
            }]);
        }
        setProductoDetalle(productoConDescripcion);
    }, [productoDetalle1]);


    return (
        <><Helmet>
            <title>Detalle</title>
            <meta name="description" content="Página de detalle de producto" />
            <meta name="robots" content="INDEX,FOLLOW" />
        </Helmet>
            <Box>
                <CajaBusqueda/>
                {
                    productoDetalle !== undefined &&
                    <>
                        {categorias?.length > 0 &&
                            <Box className={'container-miga'}><MigaDePan categorias={categorias}/></Box>}
                        <Box className={'container-producto'}>
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <Item><img className={'img-detalle'}
                                               src={productoDetalle?.item?.picture}/>
                                        <Box className={'container-descripcion'}>
                                            <h1>Descripción del producto</h1>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary"
                                                            key={`${productoDetalle.item?.id}-grid-typo-shipp`}>
                                                    {productoDetalle.item?.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Item>

                                </Grid>
                                <Grid item xs>
                                    <Item className={'container-item-comprar'}>
                                        <Box className={'container-comprar'}>
                                            <Box
                                                className={'container-items-comprar'}>{`${R.pathOr('Condición no disponible', ['item', 'condition'], productoDetalle)} - ${R.pathOr('No disponible número de', ['item', 'sold_quantity'], productoDetalle)} vendidos`}</Box>
                                            <Box className={'container-items-comprar'}>
                                                <h3>{R.pathOr('Título no disponible', ['item', 'title'], productoDetalle)}</h3></Box>
                                            <Box className={'container-items-comprar'}>
                                                <h1>{R.pathOr(undefined, ['item', 'price'], productoDetalle) !== undefined
                                                    && FormatearPrecio(R.pathOr('ARS', ['item', 'price', 'curremcy'], productoDetalle),
                                                        R.pathOr(0, ['item', 'price', 'amount'], productoDetalle))}
                                                </h1>
                                            </Box>
                                            <Box className={'container-button-comprar'}><Button variant="contained"
                                                                                    onClick={() => alert('Todo: Carrito de compras :)')}>Comprar</Button></Box>
                                        </Box>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                }
            </Box>
        </>

    );
}


export default Detalle;
