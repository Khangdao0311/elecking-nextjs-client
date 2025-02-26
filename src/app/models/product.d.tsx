interface IProduct{
    id: string
    name: string
    images: string[]
    price: number
    sale: boolean
    status: number
    view: number
    description: string
    brand: IProductBrand
    category: IProductCat
    variants: IProductVariant[]
}

interface IProductVariant{
    properties: string[]
    price_extra: number
    price_sale: number
    colors: IProductColor[]
}

interface IProductColor{
    name: string
    image: string
    price_extra: number
    status: number
    quantity: number
}

interface IProductCat{
   id: string
   name: string
}

interface IProductBrand{
    id: string
    name: string
}