interface IOrder {
  id: string;
  total: number;
  status: number;
  payment_status: boolean;
  ordered_at: string;
  updated_at: string;
  transaction_code: string;
  price_ship: number;
  products: IProductOrder[];
  user: IUsers;
  voucher_id: null;
  payment_method: IPaymment_methods;
  address: IAddress;
}

interface IProductOrder {
  product: {
    id: string;
    name: string;
    image: string;
    variant: number;
    color: number;
    price: number;
  };
  quantity: number;
  reviewed: boolean;
}

interface IUsers {
  id: string;
  fullname: string;
}

interface IPaymment_methods {
  id: string;
  name: string;
}
