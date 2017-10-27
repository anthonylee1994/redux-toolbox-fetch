import "isomorphic-fetch";
import { put, call } from "redux-saga/effects";
import { pipe, isEmpty } from "ramda";
import queryStringBodyParser from "./BodyParsers/QueryStringBodyParser";
import { bodyParser, ContentType, Method, IReduxAction } from "./interfaces";

export class HttpRequestBuilder {

    private url: string;
    private query: any = {};

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
            this.requestInit.body = pipe(...middleware)(this.requestInit.body);
        } else if (typeof middleware === "function") {
            this.requestInit.body = middleware(this.requestInit.body);
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
        const url = this.url + (!isEmpty(this.query) ? ("?" + queryStringBodyParser(this.query)) : "");
        return fetch(url, this.requestInit);
    }

}

export const http = {
    request: (
        method: Method | string,
        url: (payload?: any) => string,
        otherConfig: {
            bodyParserMiddleware?: bodyParser[] | bodyParser,
            requestExtra?: any,
        } = {},
    ) => (action: IReduxAction) => new HttpRequestBuilder()
        .setMethod(method)
        .setUrl(url(action.payload))
        .setBody(action.payload.data)
        .applyBodyParserMiddleware(!isEmpty(otherConfig) && !isEmpty(otherConfig.bodyParserMiddleware) ? otherConfig.bodyParserMiddleware : [])
        .setRequestExtraConfig(!isEmpty(otherConfig) && !isEmpty(otherConfig.requestExtra) ? otherConfig.requestExtra : {})
        .build(),
    get: (
        url: (payload?: any) => string,
        otherConfig: {
            bodyParserMiddleware?: bodyParser[] | bodyParser,
            requestExtra?: any,
        } = {},
    ) => (action: IReduxAction) => new HttpRequestBuilder()
        .setMethod(Method.GET)
        .setUrl(url(action.payload))
        .setQuery(action.payload.data)
        .applyBodyParserMiddleware(!isEmpty(otherConfig) && !isEmpty(otherConfig.bodyParserMiddleware) ? otherConfig.bodyParserMiddleware : [])
        .setRequestExtraConfig(!isEmpty(otherConfig) && !isEmpty(otherConfig.requestExtra) ? otherConfig.requestExtra : {})
        .build(),
    post: (
        url: (payload?: any) => string,
        otherConfig: {
            bodyParserMiddleware?: bodyParser[] | bodyParser,
            requestExtra?: any,
        } = {},
    ) => (action: IReduxAction) => new HttpRequestBuilder()
        .setMethod(Method.POST)
        .setUrl(url(action.payload))
        .setBody(action.payload.data)
        .applyBodyParserMiddleware(!isEmpty(otherConfig) && !isEmpty(otherConfig.bodyParserMiddleware) ? otherConfig.bodyParserMiddleware : [])
        .setRequestExtraConfig(!isEmpty(otherConfig) && !isEmpty(otherConfig.requestExtra) ? otherConfig.requestExtra : {})
        .build(),
    put: (
        url: (payload?: any) => string,
        otherConfig: {
            bodyParserMiddleware?: bodyParser[] | bodyParser,
            requestExtra?: any,
        } = {},
    ) => (action: IReduxAction) => new HttpRequestBuilder()
        .setMethod(Method.PUT)
        .setUrl(url(action.payload))
        .setBody(action.payload.data)
        .applyBodyParserMiddleware(!isEmpty(otherConfig) && !isEmpty(otherConfig.bodyParserMiddleware) ? otherConfig.bodyParserMiddleware : [])
        .setRequestExtraConfig(!isEmpty(otherConfig) && !isEmpty(otherConfig.requestExtra) ? otherConfig.requestExtra : {})
        .build(),
    delete: (
        url: (payload?: any) => string,
        otherConfig: {
            bodyParserMiddleware?: bodyParser[] | bodyParser,
            requestExtra?: any,
        } = {},
    ) => (action: IReduxAction) => new HttpRequestBuilder()
        .setMethod(Method.DELETE)
        .setUrl(url(action.payload))
        .setBody(action.payload.data)
        .applyBodyParserMiddleware(!isEmpty(otherConfig) && !isEmpty(otherConfig.bodyParserMiddleware) ? otherConfig.bodyParserMiddleware : [])
        .setRequestExtraConfig(!isEmpty(otherConfig) && !isEmpty(otherConfig.requestExtra) ? otherConfig.requestExtra : {})
        .build(),
};

export function fetchSaga(
    request: (action: IReduxAction) => Promise<any>,
    resolve: (response: Response) => IterableIterator<Promise<any> | IReduxAction>,
    reject: (error: Error) => IterableIterator<Promise<any> | IReduxAction>,
) {

    return function* saga(action: IReduxAction): any {
        const { response, error } = yield call(request, action);
        if (!error) {
            yield put(yield call(resolve, response));
        } else {
            yield put(yield call(reject, error));
        }
    };
}

// const fuck = http.get(
//     () => "http://httpstat.us/200",
// );

// fetchSaga(
//     fuck,
//     function*(response) {
//         const json = yield response.text();
//         return {
//             type: "SUCCESS",
//             payload: json,
//         };
//     },
//     function*(error) {
//         return {
//             type: "FAILURE",
//             payload: error,
//         };
//     },
// )
// ({
//         type: "FUCK",
//         payload: {},
// }).next();

// export function* xxx() {
//     const { response } = yield call(fetch, "http://hk.yahoo.com");
//     return response;
// }
// const gen = xxx();

// console.log(gen.next().value);
// console.log(gen.next({response: {aaa: 111}}).value);
