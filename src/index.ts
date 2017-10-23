import "isomorphic-fetch";
import { put } from "redux-saga/effects";
import { pipe } from "ramda";
import { IHttpRequestConfig, bodyParser, ContentType, Method, IHttpHelperExtraConfig, IReduxAction } from "./interfaces";
import { queryStringBodyParser, jsonBodyParser } from "./bodyParsers";
import { HttpRequestError } from "./error";

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
    get: (urlParser: (payload: any) => string, body?: any, otherConfig?: IHttpHelperExtraConfig) => {
        return (action: IReduxAction) => httpRequest({
            url: urlParser(action.payload),
            body: action.payload.data,
            method: Method.GET,
            ...otherConfig,
        });
    },
    post: (urlParser: (payload: any) => string, body?: any, otherConfig?: IHttpHelperExtraConfig) => {
        return (action: IReduxAction) => httpRequest({
            url: urlParser(action.payload),
            body: action.payload.data,
            method: Method.POST,
            ...otherConfig,
        });
    },
    put: (urlParser: (payload: any) => string, body?: any, otherConfig?: IHttpHelperExtraConfig) => {
        return (action: IReduxAction) => httpRequest({
            url: urlParser(action.payload),
            body: action.payload.data,
            method: Method.PUT,
            ...otherConfig,
        });
    },
    delete: (urlParser: (payload: any) => string, body?: any, otherConfig?: IHttpHelperExtraConfig) => {
        return (action: IReduxAction) => httpRequest({
            url: urlParser(action.payload),
            body: action.payload.data,
            method: Method.DELETE,
            ...otherConfig,
        });
    },
};

export function fetchSaga(request: (action: IReduxAction) => Promise<Response>, success: (response: any) => IterableIterator<IReduxAction>, failure: (e) => IReduxAction) {

    return function* saga(action: IReduxAction): any {
        try {
            const response = yield request(action);
            if (!response) {
                throw new HttpRequestError("Unable to connect to API Server", -1);
            }
            yield put(yield success(response));
        } catch (e) {
            console.error(e);
            yield put(failure(e));
        }
    };
}
