interface ICategory {
  id: string;
  name: string;
  image: string;
  status: number;
  icon: string;
  propertype: IProptype[];
  description: string;
}
interface IProptype {
  id: string;
}
