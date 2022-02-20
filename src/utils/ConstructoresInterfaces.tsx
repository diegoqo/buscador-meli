import { calcularDecimal } from './CalcularDecimal';
import { IDataResponseQuery, IProductos, IResultsQuery } from '../modelo/interfaces';

const R = require('ramda');

export const ConstructorProductoDetalle1 = (responseDetalle1: IDataResponseQuery) => {
    return {
        author: {
            name: 'Diego',
            lastName: 'Quevedo'
        },
        item: {
            id: R.pathOr('No tiene id asociado', ['id'], responseDetalle1),
            title: R.pathOr('No tiene title asociado', ['title'], responseDetalle1),
            picture: R.pathOr('No tiene thumbnail asociado', ['thumbnail'], responseDetalle1),
            condition: R.pathOr('No tiene condition asociado', ['condition'], responseDetalle1),
            free_shipping: R.pathOr(false, ['shipping', 'free_shipping'], responseDetalle1),
            sold_quantity: R.pathOr(0, ['sold_quantity'], responseDetalle1),
            category: R.pathOr('No tiene category_id asociado', ['category_id'], responseDetalle1),
            price: {
                currency: R.pathOr('No tiene currency_id asociado', ['currency_id'], responseDetalle1),
                amount: R.pathOr(0, ['price'], responseDetalle1),
                decimals: R.map(calcularDecimal, R.pathOr(0, ['price'], responseDetalle1))
            }
        }
    }
}

export const ConstructorProductoDetalle2 = (productoDetalle1: IProductos, responseDetalle2: IDataResponseQuery) => {
    return {
        author: R.pathOr({}, ['author'], productoDetalle1),
        categories: [],
        items: [],
        item: {
            ...R.pathOr({}, ['item'], productoDetalle1),
            description: R.pathOr('No hay descripción para el producto', ['plain_text'], responseDetalle2),
        }
    }
}

export const ConstructorCategorias = (ct: { id: string; name: string; }) => {
    return {
        id: ct?.id,
        nombre: ct?.name
    }
}

export const ConstructorItems = (res: IResultsQuery) => {
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
}

export const ConstructorProductos = (response: IDataResponseQuery) => {
    return {
        author: {
            name: 'Diego',
            lastName: 'Quevedo'
        },
        categories: R.map(ConstructorCategorias, R.pathOr([], ['filters', 0 , 'values', 0, 'path_from_root'], response)),
        items: R.map(ConstructorItems, R.pathOr([], ['results'], response)),
    }
}
