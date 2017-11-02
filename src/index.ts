import "whatwg-fetch";
import { put, call, select } from "redux-saga/effects";
import { pipe, isEmpty } from "ramda";
import queryStringBodyParser from "./BodyParsers/QueryStringBodyParser";
import { bodyParser, ContentType, Method, IReduxAction } from "./interfaces";

export type GetBody = (response: Response) => Promise<any>;
export interface IResultObject {
    error?: Error;
    data?: any;
    status?: number;
    statusText?: string;
}
export class HttpRequestBuilder {

    private url: string;
    private query: any = {};
    private middleware: bodyParser[] = [];


    private requestInit: RequestInit = {
        headers: {
        },
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

    public applyBodyParserMiddleware(middleware: bodyParser[] | bodyParser) {
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
        const url = this.url + (!isEmpty(this.query) ? ("?" + queryStringBodyParser(this.query)) : "");
        return fetch(url, this.requestInit);
    }

    public toResult(getBody: GetBody = response => response.json()): Promise<IResultObject> {
        const requestPromise = this.build();
        return requestPromise.then(response => {
            const result: any = {
                status: response.status,
                statusText: response.statusText,
            };
            console.log(result, response);
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
