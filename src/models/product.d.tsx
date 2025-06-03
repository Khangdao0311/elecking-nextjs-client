interface IProduct {
    id: string
    name: string
    images: string[]
    rating: number
    view: number
    description: string
    brand: IProductBrand
    category: IProductCat
    variants: IProductVariant[]
}

interface IProperty {
    id: string
    name: string
    proptype: IProptype[]
}

interface IProptype {
    id: string
    name: string
}

interface IProductVariant {
    properties: IProperty[]
    price: number
    price_sale: number
    colors: IProductColor[]
}

interface IProductColor {
    name: string
    image: string
    price_extra: number
    status: number
    quantity: number
}

interface IProductCat {
    id: string
    name: string
}

interface IProductBrand {
    id: string
    name: string
}