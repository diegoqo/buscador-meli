
export interface IProductos {
    author: IAuthor,
    categories: string[],
    items: IItem[]
}

interface IAuthor {
    name: string,
    lastName: string
}

interface IItem {
    id: string,
    title: string,
    price: IPrice,
    picture: string,
    condition: string,
    free_shipping: boolean
}

interface IPrice {
    currency: string,
    amount: number,
    decimals?: number
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
