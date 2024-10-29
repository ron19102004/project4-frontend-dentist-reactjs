export interface IResponseLayout<D> {
    success: boolean;
    message: string;
    data: D
}
export interface Entity {
    id: number
}