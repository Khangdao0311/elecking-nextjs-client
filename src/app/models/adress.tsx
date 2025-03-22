interface Iloca {
  code: number;
  name: string;
}

interface IAddress {
  id: string;
  province: Iloca;
  district: Iloca;
  ward: Iloca;
  description: string;
  phone: string;
  fullname: string;
  type: number;
  setDefault: boolean;
  user_id: string;
}
