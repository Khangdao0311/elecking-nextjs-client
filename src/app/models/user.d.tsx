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
  wish: string[];
}
interface ICart {
  checked: boolean;
  product: {
    id: string;
    variant: number;
    color: number;
  };
  quantity: number;
}
