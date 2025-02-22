interface IProduct{
    id: string
    name: string
    images: string[]
    price: number
    sale: boolean
    status: number
    view: number
    description: string
    brand_id: string
    category_id: string
    variants: IVariant[]
}

interface IVariant{
    property_ids: string[]
    price_extra: number
    price_sale: number
    color: string[]
}