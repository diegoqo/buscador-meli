
export interface IProductos extends IDetalleProducto{
    author: IAuthor,
    categories?: ICategorias[],
    items?: IItem[],
}

export interface IDetalleProducto {
    item?: IItem
}

export interface ICategorias {
    id: string,
    nombre: string
}

interface IAuthor {
    name: string,
    lastName: string
}

export interface IItem extends ItemDetalle{
    id: string,
    title: string,
    price: IPrice,
    picture: string,
    condition: string,
    free_shipping: boolean
}

export interface ItemDetalle {
    sold_quantity?: number,
    description?: string,
    category?: string,
}

interface IPrice {
    currency: string,
    amount: number,
    decimals?: string
}

export interface IDataResponseQuery extends IDetailResponseQuery{
    filters: IFiltersResponseQuery[],
    results: IResultsQuery[],
}

export interface IDetailResponseQuery {
    id: string,
    title: string,
    thumbnail: string,
    condition: string,
    free_shipping: boolean,
    sold_quantity: number,
    category_id: string,
    plain_text: string,
    shipping: {
        free_shipping: boolean
    },
    currency_id: string,
    price: number
}

interface IBaseQuery {
    id: string,
    name: string,
}

export interface IValuesResponseQuery {
    id: string,
    name: string,
    path_from_root: IBaseQuery[]
}

export interface IFiltersResponseQuery {
    values: IValuesResponseQuery[],
}

export interface IResultsQuery {
    id: any,
    title: any,
    thumbnail: any,
    condition: any,
    shipping: {
        free_shipping: any,
    },
    prices: {
        prices:[{
            decimals: any,
            amount: any,
            currency_id: any
        }]
    }
}
