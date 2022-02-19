
export interface IProductos {
    author: IAuthor,
    categories?: ICategorias[],
    items?: IItem[],
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

export interface IItem {
    id: string,
    title: string,
    price: IPrice,
    picture: string,
    condition: string,
    free_shipping: boolean,
    sold_quantity?: number,
    description?: string,
    category?: string,
}

interface IPrice {
    currency: string,
    amount: number,
    decimals?: string
}

export interface IResponseQuery {
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
