import "whatwg-fetch";
import { put, call, select } from "redux-saga/effects";
import * as pipe from "ramda/src/pipe";
import * as isEmpty from "ramda/src/isEmpty";

// Enums
export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export enum ContentType {
    FormUrlencoded = "application/x-www-form-urlencoded",
    JSON = "application/json",
    Multipart = "multipart/form-data",
}

// Types
export type bodyParserFunction = (requestBody: any) => any;

export type GetBody = (response: Response) => Promise<any>;

// Interfaces
export interface IReduxAction {
    type: string;
    payload?: any;
}

export interface IResultObject {
    error?: Error;
    data?: any;
    status?: number;
    statusText?: string;
}

// Objects
export const BodyParsers = {
    json(body) {
        return JSON.stringify(body);
    },
    queryString(body) {
        if (!body) {
            return "";
        }
        let str = "";
        for (const v in body) {
            if (body.hasOwnProperty(v)) {
                str += `${v}=${encodeURIComponent(body[v])}&`;
            }
        }
        return str.substr(0, str.length - 1);
    }
    
};

// Classes
export class HttpRequestError {
    public name = "HttpRequestError";
    public message: any;
    public response: any;
    public jsonResponse: any;
    public stack: any = (new Error()).stack;
    public status: number;

    constructor(message: string, status: number, response: any = {}) {
        this.message = message;
        this.status = status;
        this.response = response;
    }
}

export class HttpRequestBuilder {

    private url: string;
    private query: any = {};
    private middleware: bodyParserFunction[] = [];

    private requestInit: RequestInit | any = {
        headers: {},
        credentials: "same-origin",
    };

    public setMethod(x: Method | string) {
        this.requestInit.method = x;
        return this;
    }

    public getMethod() {
        return this.requestInit.method;
    }

    public setCredentials(x: RequestCredentials) {
        this.requestInit.credentials = x;
        return this;
    }

    public getCredentials() {
        return this.requestInit.credentials;
    }

    public setContentType(x: ContentType | string) {
        this.requestInit.headers["Content-Type"] = x;
        return this;
    }

    public getContentType() {
        return this.requestInit.headers["Content-Type"];
    }

    public setAcceptType(x: string) {
        this.requestInit.headers.Accept = x;
        return this;
    }

    public getAcceptType() {
        return this.requestInit.headers.Accept;
    }

    public setAuthorization(x: string) {
        this.requestInit.headers.Authorization = x;
        return this;
    }

    public getAuthorization() {
        return this.requestInit.headers.Authorization;
    }

    public setUrl(x: string) {
        this.url = x;
        return this;
    }

    public getUrl() {
        return this.url;
    }

    public setQuery(x: any) {
        this.query = x;
        return this;
    }

    public getQuery() {
        return this.query;
    }

    public setBody(x: any) {
        this.requestInit.body = x;
        return this;
    }

    public getBody() {
        return this.requestInit.body;
    }

    public applyBodyParserMiddleware(middleware: bodyParserFunction[] | bodyParserFunction) {
        if (Array.isArray(middleware) && middleware.length > 0) {
            this.middleware = middleware;
        } else if (typeof middleware === "function") {
            this.middleware = [... this.middleware, middleware];
        }
        return this;
    }

    public setRequestInit(x: RequestInit) {
        this.requestInit = x;
        return this;
    }

    public getRequestInit() {
        return this.requestInit;
    }

    public setRequestExtraConfig(x: any) {
        this.requestInit = {
            ... this.requestInit,
            ...x,
        };
        return this;
    }

    public build() {
        this.execBodyParserMiddleware();
        const url = this.url + (!isEmpty(this.query) ? ("?" + BodyParsers.queryString(this.query)) : "");
        return fetch(url, this.requestInit);
    }

    public toResult(getBody: GetBody = response => response.json()): Promise<IResultObject> {
        const requestPromise = this.build();
        return requestPromise.then(response => {
            const result: any = {
                status: response.status,
                statusText: response.statusText,
            };
            return getBody(response).then(data => {
                result.data = data;
                return result;
            }).catch(error => {
                result.error = error;
                return result;
            });
        }).catch(error => ({ ...error }));
    }

    private execBodyParserMiddleware() {
        this.requestInit.body = pipe(...this.middleware)(this.requestInit.body);
    }

}


// Saga Helper
export function fetchSaga(
    request: (action: IReduxAction, store?: any) => Promise<any>,
    response: (response: Response) => IterableIterator<Promise<any> | IReduxAction>,
) {

    return function* saga(action: IReduxAction): any {
        const store = yield select();
        const callbackAction = yield call(response, yield call(request, action, store));
        if (callbackAction) {
            yield put(callbackAction);
        }
    };
}
