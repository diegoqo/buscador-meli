import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CajaBusqueda from '../../cajabusqueda/CajaBusqueda';
import axios from 'axios';
import { IProductos, IResponseQuery } from '../../../modelo/interfaces';
import MigaDePan from '../../migadepan/MigaDePan';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Productos.scss'

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
    const navigate = useNavigate();

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
        axios.get('http://localhost:8080/search', {
            params: {query: query}
        }).then(response => {
            console.log(response.data.results.length)
            const resultsApi: IProductos = {
                author: {
                    name: 'Diego',
                    lastName: 'Quevedo'
                },
                categories: response.data.filters[0]?.values[0]?.path_from_root.map((categorias: { id: string, name: string }) => {
                    return {
                        id: categorias?.id,
                        nombre: categorias?.name
                    }
                }),
                items: response.data.results.map((res: IResponseQuery) => {
                        return {
                            id: res?.id,
                            title: res?.title,
                            picture: res?.thumbnail,
                            condition: res?.condition,
                            free_shipping: res?.shipping?.free_shipping,
                            price: {
                                currency: res.prices?.prices[0].currency_id,
                                amount: res.prices?.prices[0].amount,
                                decimals: calcularDecimal(res.prices?.prices[0].amount)
                            }
                        }
                    },
                )
            }
            localStorage.setItem('categorias', JSON.stringify(resultsApi?.categories))
            setResults(resultsApi)
            return resultsApi;
        })
    }, [query]);

    const handleDetail = (idProducto: string) => {
        navigate(`/items/${idProducto}`);
    }

    return (
        <Box>
            <CajaBusqueda defaultQuery={query || ''}/>
            {results !== undefined && results.items && results.items?.length > 0 && results.items?.length > 0 &&
                <>
                        {results?.categories !== undefined && results?.categories?.length > 0 &&
                            <Box sx={{ml: 3, mt: 2}}><MigaDePan categorias={results?.categories}/></Box>}
                        {results?.items.slice(0, 4).map(it =>
                            <>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            mt: 2,
                                            ml: 'auto',
                                            mr: 'auto',
                                            mb: 'auto',
                                            minWidth: 400,
                                            maxWidth: 600,
                                            alignItems: 'center',
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                        }}
                                        key={`${it.id}-paper`}
                                    ><a className={'href-grid'} onClick={() => handleDetail(it.id)} key={`${it.id}-a`}>
                                        <Grid container spacing={2} key={`${it.id}-grid-img-container`}>
                                            <Grid item sx={{width: 128, height: 128}} key={`${it.id}-grid-img`}>
                                                <Img alt="complex" src={it.picture} key={`${it.id}-img`}/>
                                            </Grid>
                                            <Grid item xs={12} sm container sx={{textAlign: 'left'}}
                                                  key={`${it.id}-grid-desc-container`}>
                                                <Grid item xs container direction="column" spacing={2}
                                                      key={`${it.id}-grid-desc`}>
                                                    <Grid item xs key={`${it.id}-grid-desc-xs`}>
                                                        <Typography gutterBottom variant="subtitle1" component="div"
                                                                    key={`${it.id}-grid-typo-sub`}>
                                                            {Intl.NumberFormat('es-AR', {
                                                                style: 'currency',
                                                                currency: 'ARS'
                                                            }).format(it.price.amount)}
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
