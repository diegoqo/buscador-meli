import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CajaBusqueda from '../../cajabusqueda/CajaBusqueda';
import axios from 'axios';
import { ICategorias, IProductos } from '../../../modelo/interfaces';
import MigaDePan from '../../migadepan/MigaDePan';


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
                console.log(response);
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
                const categoriasLst: ICategorias[] = Array.from(JSON.parse(localStorage.getItem('categorias')!));
                const categoriaEncontrada = categoriasLst?.find(cat => cat.id === productoConDescripcion?.item?.category);

                if(categoriaEncontrada) {
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
            <div>Hola soy detalle</div>
            <CajaBusqueda/>
            <p>id es: {id}</p>{
            productoDetalle !== undefined &&
            <>
                {categorias?.length > 0 && <MigaDePan categorias={categorias}/>}
                <p>la imagen es: <img src={productoDetalle?.item?.picture}/></p>
                <p>La descripción es: {productoDetalle?.item?.description}</p>
            </>
        }
        </>

    );
}


export default Detalle;
