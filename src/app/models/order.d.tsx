interface IOrder{
    id: string
    total: string
    status: number
    payment_status: boolean
    ordered_at: string
    updated_at: string
    transaction_code: string
    price_ship: number
    products: IProducts
    user: IUsers
    voucher_id: null
    payment_method: IPaymment_methods
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
interface IUsers{
    id: string
    fullname: string
}
interface IPaymment_methods{
    id: string
    name: string
}