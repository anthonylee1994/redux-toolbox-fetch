export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export enum ContentType {
    FormUrlencoded = "application/x-www-form-urlencoded",
    JSON = "application/json",
    Multipart = "multipart/form-data",
}

export type bodyParser = (requestBody: any) => any;

export interface IReduxAction {
    type: string;
    payload: any;
}
