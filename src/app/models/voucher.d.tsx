interface IVoucher{
    id: string
    code: string
    discount_type: number
    discount_value: number
    min_order_value: number
    max_discount: number
    start_date: string
    end_date:  string
    status: number
    quantity: number
    user_id: null
}