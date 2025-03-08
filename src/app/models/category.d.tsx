interface ICategory {
    id: string
    name: string
    image: string
    status: number
    propertype: IPropertype[]
}
interface IPropertype {
    id: string
    name: string
}