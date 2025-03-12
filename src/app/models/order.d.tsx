interface IOrder {
    id: string
    total: string
    status: number
    payment_status: boolean
    ordered_at: string
    updated_at: string
    transaction_code: string
    price_ship: number
    products: IProducts
    user_id: string
    voucher_id: null
    payment_method_id: string
    address_id: string
}
interface IProducts{
    product_id : string
    variant: number
    color: number
    quantity: number
    price: number
    reviewed: boolean
}