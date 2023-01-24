export interface ResponseModel{
    type: any;
    loaded: number;
    total: number;
    body(body: any): unknown;
    success:boolean,
    message:string
}
