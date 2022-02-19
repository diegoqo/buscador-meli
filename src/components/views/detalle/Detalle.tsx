import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CajaBusqueda from '../../cajabusqueda/CajaBusqueda';
import axios from 'axios';
import { ICategorias, IProductos } from '../../../modelo/interfaces';
import MigaDePan from '../../migadepan/MigaDePan';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Detalle.scss'

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
    const [productoDetalle, setProductoDetalle] = useState<IProductos>();

    const calcularDecimal = (amount: number) => {
        const amountSplit: string[] = amount.toString().split('.');
        return amountSplit.length > 1
            ? validarDecimal(amountSplit[1])
            : '00'
    }

    const validarDecimal = (decimal: string) => {
        return (decimal.length == 1 ? decimal.concat('0') : decimal).substring(0, 1);
    }

    useEffect(() => {
        axios.get('http://localhost:8080/search-item', {
            params: {id: id}
        }).then(response => {
                return {
                    author: {
                        name: 'Diego',
                        lastName: 'Quevedo'
                    },
                    item: {
                        id: response.data?.id,
                        title: response.data?.title,
                        picture: response.data?.thumbnail,
                        condition: response.data?.condition,
                        free_shipping: response.data?.shipping?.free_shipping,
                        sold_quantity: response.data?.sold_quantity,
                        category: response.data?.category_id,
                        price: {
                            currency: response.data.currency_id,
                            amount: response.data.price,
                            decimals: calcularDecimal(response.data.price)
                        }
                    }
                };
            }
        ).then(resultadoConsulta1 => {
            axios.get('http://localhost:8080/search-description', {
                params: {id: id}
            }).then(responseDescription => {
                const productoConDescripcion = {
                    ...resultadoConsulta1,
                    item: {
                        ...resultadoConsulta1.item,
                        description: responseDescription?.data?.plain_text,
                    }
                };
                const categoriasLocalStorage = localStorage.getItem('categorias');
                const categoriasLst: ICategorias[] = categoriasLocalStorage !== 'undefined' && categoriasLocalStorage !== null
                    ? Array.from(JSON.parse(categoriasLocalStorage))
                    : [];
                const categoriaEncontrada = categoriasLst.length > 0 ? categoriasLst?.find(cat => cat.id === productoConDescripcion?.item?.category) : null;

                if (categoriaEncontrada) {
                    setCategorias([categoriaEncontrada, {
                        id: productoConDescripcion.item.id,
                        nombre: productoConDescripcion.item.title
                    }]);
                }
                setProductoDetalle(productoConDescripcion);
            })
        })

    }, [id]);

    return (
        <>
            <Box>
                <CajaBusqueda/>
                {
                    productoDetalle !== undefined &&
                    <>
                        {categorias?.length > 0 && <Box sx={{m: 2}}><MigaDePan categorias={categorias}/></Box>}
                        <Box sx={{m: 2, backgroundColor: '#ededed'}}>
                            <Grid container sx={{height: '100%'}} spacing={2}>
                                <Grid sx={{height: 'auto'}} item xs={7}>
                                    <Item><img className={'img-detalle'}
                                               src={productoDetalle?.item?.picture}/>
                                        <Box sx={{textAlign: 'left'}}>
                                            <p>
                                                <h1>Descripción del producto</h1>
                                            </p>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary"
                                                            key={`${productoDetalle.item?.id}-grid-typo-shipp`}>
                                                    {productoDetalle.item?.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Item>

                                </Grid>
                                <Grid sx={{height: 'auto'}} item xs>
                                    <Item sx={{height: 400}}>
                                        <Box sx={{mt: 4, ml: 2}}>
                                            <Box
                                                sx={{textAlign: 'left'}}>{`${productoDetalle.item?.condition} - ${productoDetalle.item?.sold_quantity} vendidos`}</Box>
                                            <Box sx={{textAlign: 'left'}}><h3>{productoDetalle.item?.title}</h3></Box>
                                            <Box sx={{textAlign: 'left'}}>
                                                <h1>{productoDetalle.item !== undefined && productoDetalle.item?.price !== undefined && Intl.NumberFormat('es-AR', {
                                                    style: 'currency',
                                                    currency: productoDetalle.item?.price.currency
                                                }).format(productoDetalle.item?.price.amount)}</h1></Box>
                                            <Box sx={{textAlign: 'center'}}><Button variant="contained"
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
