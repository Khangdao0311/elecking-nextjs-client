interface ICategory {
    id: string
    name: string
    image: string
    status: number
    propertype: IProptype[]
    description: string
}
interface IProptype {
    id: string
}