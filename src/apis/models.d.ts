export interface IResponseLayout<D> {
    success: boolean;
    message: string;
    data: D
}
export interface Entity {
    id: number
}
export interface Service extends Entity{
    name: string;
    description: string;
    price: number;
    poster: string;
}