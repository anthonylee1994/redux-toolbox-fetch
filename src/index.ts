import "isomorphic-fetch";
import { put, call } from "redux-saga/effects";
import { pipe } from "ramda";
import { IHttpRequestConfig, bodyParser, ContentType, Method, IHttpHelperExtraConfig, IReduxAction } from "./interfaces";
import { queryStringBodyParser, jsonBodyParser } from "./bodyParsers";

export function applyBodyParserMiddleware(middleware: bodyParser[]): any {
    if (!middleware || middleware.length === 0) {
        return (x: any) => x;
    }
    return pipe(...middleware);
}

export function httpRequest(httpRequestConfig: IHttpRequestConfig) {
    let config: RequestInit = {
        credentials: "same-origin",
        method: httpRequestConfig.method,
    };

    if (httpRequestConfig.requestType) {
        config.headers["Content-Type"] = httpRequestConfig.requestType;
    }
    if (httpRequestConfig.responseType) {
        config.headers.Accept = httpRequestConfig.responseType;
    }
    if (httpRequestConfig.authToken) {
        config.headers.Authorization = httpRequestConfig.authToken;
    }
    if (applyBodyParserMiddleware(httpRequestConfig.bodyParserMiddleware)(httpRequestConfig.body)) {
        config.body = applyBodyParserMiddleware(httpRequestConfig.bodyParserMiddleware)(httpRequestConfig.body);
    }

    if (httpRequestConfig.method === Method.GET && config.body && queryStringBodyParser(config.body).length > 0) {
        httpRequestConfig.url += "?" + queryStringBodyParser(config.body);
    }

    if (httpRequestConfig.customHttpConfig) {
        config = {
            ...httpRequestConfig.customHttpConfig,
        };
    }

    if (config.body && httpRequestConfig.requestType === ContentType.FormUrlencoded) {
        config.body = queryStringBodyParser(config.body);
    }
    if (config.body && httpRequestConfig.requestType === ContentType.JSON) {
        config.body = jsonBodyParser(config.body);
    }

    return fetch(httpRequestConfig.url, config);
}

export const http = {
    request: (
        resolve: (response: Response) => IterableIterator<Promise<any> | IReduxAction>,
        reject: (error: Error) => IReduxAction,
        config: {
            method: Method,
            urlParser: (payload: any) => string,
            body?: any,
            otherConfig?: IHttpHelperExtraConfig,
        },
    ) => {
        return (action: IReduxAction) => httpRequest({
            url: config.urlParser(action.payload),
            body: action.payload.data,
            method: config.method,
            ...config.otherConfig,
        }).then(resolve).catch(reject);
    },
    get: (
        resolve: (response: Response) => IterableIterator<Promise<any> | IReduxAction>,
        reject: (error: Error) => IReduxAction,
        config: {
            urlParser: (payload: any) => string,
            otherConfig?: IHttpHelperExtraConfig,
        },
    ) => {
        return (action: IReduxAction) => httpRequest({
            url: config.urlParser(action.payload),
            body: action.payload.data,
            method: Method.GET,
            ...config.otherConfig,
        }).then(resolve).catch(reject);
    },
    post: (
        resolve: (response: Response) => IterableIterator<Promise<any> | IReduxAction>,
        reject: (error: Error) => IReduxAction,
        config: {
            urlParser: (payload: any) => string,
            body?: any,
            otherConfig?: IHttpHelperExtraConfig,
        },
    ) => {
        return (action: IReduxAction) => httpRequest({
            url: config.urlParser(action.payload),
            body: action.payload.data,
            method: Method.POST,
            ...config.otherConfig,
        }).then(resolve).catch(reject);
    },
    put: (
        resolve: (response: Response) => IterableIterator<Promise<any> | IReduxAction>,
        reject: (error: Error) => IReduxAction,
        config: {
            urlParser: (payload: any) => string,
            body?: any,
            otherConfig?: IHttpHelperExtraConfig,
        },
    ) => {
        return (action: IReduxAction) => httpRequest({
            url: config.urlParser(action.payload),
            body: action.payload.data,
            method: Method.PUT,
            ...config.otherConfig,
        }).then(resolve).catch(reject);
    },
    delete: (
        resolve: (response: Response) => IterableIterator<Promise<any> | IReduxAction>,
        reject: (error: Error) => IReduxAction,
        config: {
            urlParser: (payload: any) => string,
            body?: any,
            otherConfig?: IHttpHelperExtraConfig,
        },
    ) => {
        return (action: IReduxAction) => httpRequest({
            url: config.urlParser(action.payload),
            body: action.payload.data,
            method: Method.DELETE,
            ...config.otherConfig,
        }).then(resolve).catch(reject);
    },
};

export function fetchSaga(request: (action: IReduxAction) => Promise<any>) {

    return function* saga(action: IReduxAction): any {
        const {response, error} = yield call(request, action);
        console.log(response);
        if (!error) {
            yield put(response);
        } else {
            yield put(error);
        }
    };
}

// const fuck = http.get(
//     function*(response: Response) {
//         const json = yield response.json();
//         return {
//             type: "SUCCESS",
//             payload: json,
//         };
//     },
//     error => {
//         return {
//             type: "FAILURE",
//             payload: error,
//         };
//     },
//     {
//         urlParser: () => "http://httpstat.us/500",
//     },
// );

// fetchSaga(fuck);
