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
  id: string;
  variant: number;
  quantity: number;
  color: number;
}

interface IWish {
  id: string;
  variant: number;
  quantity: number;
  color: number;
}
