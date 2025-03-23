interface ICategory {
  id: string;
  name: string;
  image: string;
  status: number;
  icon: string;
  proptypes: IProptype[];
  description: string;
}
interface IProptype {
  id: string;
  name: string;
}
