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

export interface IHttpRequestConfig {
    method: Method;
    url: string;
    requestType?: ContentType;
    responseType?: ContentType | string;
    authToken?: string;
    body?: any;
    bodyParserMiddleware?: bodyParser[];
    customHttpConfig?: any;
}

export interface IHttpHelperExtraConfig {
    authToken?: string;
    bodyParserMiddleware?: bodyParser[];
    requestType?: ContentType;
    responseType?: ContentType | string;
    customHttpConfig?: any;
}

export interface IReduxAction {
    type: string;
    payload: any;
}
