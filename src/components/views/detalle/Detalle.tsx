import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CajaBusqueda from '../../common/cajabusqueda/CajaBusqueda';
import { ICategorias, IProductos } from '../../../modelo/interfaces';
import MigaDePan from '../../common/migadepan/MigaDePan';
import { Box, Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
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
        response: responseDetalle1,
        errorPeticion: errorSearchItem,
        loading: loadingSearchItem
    } = useFetchData(`${urlServer}/search-item`, {id: id}, R.pathOr('', [], id));

    const {
        response: responseDetalle2,
        errorPeticion: errorSearchDescription,
        loading: loadingSearchDescription
    } = useFetchData(`${urlServer}/search-description`, {id: id}, R.pathOr('', [], id));

    useEffect(() => {
        if (responseDetalle1) {
            const detalle1: IProductos = ConstructorProductoDetalle1(responseDetalle1);
            setProductoDetalle1(detalle1);
        }

    }, [responseDetalle1, errorSearchItem, loadingSearchItem, errorSearchDescription, loadingSearchDescription]);

    useEffect(() => {
        if (responseDetalle2) {
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
        }
    }, [productoDetalle1]);


    return (
        <>
            <Helmet>
                <title>Detalle</title>
                <meta name="description" content="Página de detalle de producto"/>
                <meta name="robots" content="INDEX,FOLLOW"/>
            </Helmet>
            <Box>
                <CajaBusqueda/>
                {(loadingSearchItem || loadingSearchDescription) && <Box>
                    <CircularProgress/>
                </Box>}
                {
                    productoDetalle !== undefined &&
                    <>
                        {categorias?.length > 0 &&
                            <Box className={'container-miga'}>
                                <MigaDePan categorias={categorias}/>
                            </Box>
                        }
                        <Box className={'detalle'}>
                            <Grid container xs={10} spacing={0} className={'detalle__container-producto'}>
                                <Grid className={'detalle__container-imagen'} item xs={12} md={8}>
                                    <Item className={'detalle__container-imagen--item'}>
                                        <img alt={'imagen-detalle'} className={'detalle__container-imagen--detalle'}
                                             src={productoDetalle?.item?.picture}/>
                                        <Grid className={'detalle__container-imagen--descripcion'}>
                                            <h1>Descripción del producto</h1>
                                            <Typography variant="body2" color="text.secondary"
                                                        key={`${productoDetalle.item?.id}-grid-typo-shipp`}>
                                                {productoDetalle.item?.description}
                                            </Typography>
                                        </Grid>
                                    </Item>
                                </Grid>
                                <Grid className={'detalle__container-precio'} item xs={12} md={4}>
                                    <Item className={'detalle__container-precio--item-comprar'}>
                                        <Box>
                                            <Box
                                                className={'detalle__container-precio--comprar'}>{`${R.pathOr('Condición no disponible', ['item', 'condition'], productoDetalle)} - ${R.pathOr('No disponible número de', ['item', 'sold_quantity'], productoDetalle)} vendidos`}</Box>
                                            <Box className={'detalle__container-precio--comprar'}>
                                                <h3>{R.pathOr('Título no disponible', ['item', 'title'], productoDetalle)}</h3>
                                            </Box>
                                            <Box className={'detalle__container-precio--comprar'}>
                                                <h1>
                                                    {R.pathOr(undefined, ['item', 'price'], productoDetalle) !== undefined
                                                        &&
                                                        FormatearPrecio(R.pathOr('ARS', ['item', 'price', 'curremcy'], productoDetalle),
                                                            R.pathOr(0, ['item', 'price', 'amount'], productoDetalle))
                                                    }
                                                </h1>
                                            </Box>
                                            <Box className={'detalle__container-precio--button'}>
                                                <Button variant="contained"
                                                        onClick={() => alert('Todo: Carrito de compras :)')}>Comprar</Button>
                                            </Box>
                                        </Box>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                }
                {(errorSearchItem || errorSearchDescription) && !loadingSearchItem && !loadingSearchDescription &&
                    <>
                        <Box>
                            No fue posible consultar el detalle de tu producto. Por favor intenta más tarde.
                        </Box>
                    </>
                }
            </Box>
        </>
    );
}


export default Detalle;
