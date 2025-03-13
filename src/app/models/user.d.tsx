interface IUser {
  id: string;
  fullname: string;
  avatar: string;
  email: string;
  phone: number;
  username: string;
  password: string;
  role: number;
  status: number;
  register_date: string;
  cart: ICart[];
  wish: IWish[];
}
interface ICart {
  product: {
    id: string;
    variant: number;
    color: number;
  }
  quantity: number;
}

interface IWish {
  product: {
    id: string;
    variant: number;
    color: number;
  }
}
