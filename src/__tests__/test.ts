import { put, call, select } from "redux-saga/effects";
import { http, fetchSaga, HttpRequestBuilder } from "../index";
import jsonBodyParser from "../BodyParsers/JsonBodyParser";
import queryStringBodyParser from "../BodyParsers/QueryStringBodyParser";

describe("can handle get request", () => {

    const action = {
        type: "GET_REQUEST",
        payload: {},
    };

    let request;
    let flow;

    beforeEach(() => {
        request = http.get(
            () => "http://httpstat.us/200",
        );
        flow = fetchSaga(
            request,
            function* (response) {
                const json = yield response.text();
                return {
                    type: "SUCCESS",
                    payload: json,
                };
            },
            function* (error) {
                return {
                    type: "FAILURE",
                    payload: error,
                };
            },
        )(action);
    });

    test("should return a function", () => {
        const actual = typeof request;
        const expected = "function";
        expect(actual).toBe(expected);
    });

    test("should send request", () => {
        const actual = flow.next().value;
        const expected = call(request, action);
        expect(actual).toEqual(expected);
    });

    test("should dispatch a SUCCESS action with the success response data", (done: any) => {
        flow.next();
        Promise.resolve({
            response: "200 OK",
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "SUCCESS",
                payload: "200 OK",
            }).value;

            const expected = put({
                type: "SUCCESS",
                payload: "200 OK",
            });
            expect(actual).toEqual(expected);
            done();
        });
    });

    test("should dispatch a SUCCESS action with the failure response data", (done: any) => {
        flow.next();
        Promise.resolve({
            error: new Error("500 Error"),
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "FAILURE",
                payload: new Error("500 Error"),
            }).value;

            const expected = put({
                type: "FAILURE",
                payload: new Error("500 Error"),
            });
            expect(actual).toEqual(expected);
            done();
        });
    });
});

describe("can handle post request", () => {

    const action = {
        type: "POST_REQUEST",
        payload: {
            data: {
                a: 1,
            },
        },
    };

    let request;
    let flow;

    beforeEach(() => {
        request = http.post(
            () => "http://httpstat.us/200",
        );
        flow = fetchSaga(
            request,
            function* (response) {
                const json = yield response.text();
                return {
                    type: "SUCCESS",
                    payload: json,
                };
            },
            function* (error) {
                return {
                    type: "FAILURE",
                    payload: error,
                };
            },
        )(action);
    });

    test("should return a function", () => {
        const actual = typeof request;
        const expected = "function";
        expect(actual).toBe(expected);
    });

    test("should send request", () => {
        const actual = flow.next().value;
        const expected = call(request, action);
        expect(actual).toEqual(expected);
    });

    test("should dispatch a SUCCESS action with the success response data", (done: any) => {
        flow.next();
        Promise.resolve({
            response: "200 OK",
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "SUCCESS",
                payload: "200 OK",
            }).value;

            const expected = put({
                type: "SUCCESS",
                payload: "200 OK",
            });
            expect(actual).toEqual(expected);
            done();
        });
    });

    test("should dispatch a SUCCESS action with the failure response data", (done: any) => {
        flow.next();
        Promise.resolve({
            error: new Error("500 Error"),
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "FAILURE",
                payload: new Error("500 Error"),
            }).value;

            const expected = put({
                type: "FAILURE",
                payload: new Error("500 Error"),
            });
            expect(actual).toEqual(expected);
            done();
        });
    });
});

describe("can handle put request", () => {

    const action = {
        type: "PUT_REQUEST",
        payload: {
            data: {
                a: 1,
            },
        },
    };

    let request;
    let flow;

    beforeEach(() => {
        request = http.put(
            () => "http://httpstat.us/200",
        );
        flow = fetchSaga(
            request,
            function* (response) {
                const json = yield response.text();
                return {
                    type: "SUCCESS",
                    payload: json,
                };
            },
            function* (error) {
                return {
                    type: "FAILURE",
                    payload: error,
                };
            },
        )(action);
    });

    test("should return a function", () => {
        const actual = typeof request;
        const expected = "function";
        expect(actual).toBe(expected);
    });

    test("should send request", () => {
        const actual = flow.next().value;
        const expected = call(request, action);
        expect(actual).toEqual(expected);
    });

    test("should dispatch a SUCCESS action with the success response data", (done: any) => {
        flow.next();
        Promise.resolve({
            response: "200 OK",
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "SUCCESS",
                payload: "200 OK",
            }).value;

            const expected = put({
                type: "SUCCESS",
                payload: "200 OK",
            });
            expect(actual).toEqual(expected);
            done();
        });
    });

    test("should dispatch a SUCCESS action with the failure response data", (done: any) => {
        flow.next();
        Promise.resolve({
            error: new Error("500 Error"),
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "FAILURE",
                payload: new Error("500 Error"),
            }).value;

            const expected = put({
                type: "FAILURE",
                payload: new Error("500 Error"),
            });
            expect(actual).toEqual(expected);
            done();
        });
    });
});

describe("can handle delete request", () => {

    const action = {
        type: "DELETE_REQUEST",
        payload: {
            data: {
                a: 1,
            },
        },
    };

    let request;
    let flow;

    beforeEach(() => {
        request = http.delete(
            () => "http://httpstat.us/200",
        );
        flow = fetchSaga(
            request,
            function* (response) {
                const json = yield response.text();
                return {
                    type: "SUCCESS",
                    payload: json,
                };
            },
            function* (error) {
                return {
                    type: "FAILURE",
                    payload: error,
                };
            },
        )(action);
    });

    test("should return a function", () => {
        const actual = typeof request;
        const expected = "function";
        expect(actual).toBe(expected);
    });

    test("should send request", () => {
        const actual = flow.next().value;
        const expected = call(request, action);
        expect(actual).toEqual(expected);
    });

    test("should dispatch a SUCCESS action with the success response data", (done: any) => {
        flow.next();
        Promise.resolve({
            response: "200 OK",
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "SUCCESS",
                payload: "200 OK",
            }).value;

            const expected = put({
                type: "SUCCESS",
                payload: "200 OK",
            });
            expect(actual).toEqual(expected);
            done();
        });
    });

    test("should dispatch a SUCCESS action with the failure response data", (done: any) => {
        flow.next();
        Promise.resolve({
            error: new Error("500 Error"),
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "FAILURE",
                payload: new Error("500 Error"),
            }).value;

            const expected = put({
                type: "FAILURE",
                payload: new Error("500 Error"),
            });
            expect(actual).toEqual(expected);
            done();
        });
    });
});

describe("can handle customer request 1", () => {

    const action = {
        type: "CUSTOMIZE_REQUEST",
        payload: {
            data: {
                a: 1,
            },
        },
    };

    let request;
    let flow;

    beforeEach(() => {
        request = http.request(
            "POST",
            () => "http://httpstat.us/200",
            {
                requestExtra: {
                    credentials: "omit",
                },
                bodyParserMiddleware: [
                    jsonBodyParser,
                ],
            },
        );
        flow = fetchSaga(
            request,
            function* (response) {
                const json = yield response.text();
                return {
                    type: "SUCCESS",
                    payload: json,
                };
            },
            function* (error) {
                return {
                    type: "FAILURE",
                    payload: error,
                };
            },
        )(action);
    });

    test("should return a function", () => {
        const actual = typeof request;
        const expected = "function";
        expect(actual).toBe(expected);
    });

    test("should send request", () => {
        const actual = flow.next().value;
        const expected = call(request, action);
        expect(actual).toEqual(expected);
    });

    test("should dispatch a SUCCESS action with the success response data", (done: any) => {
        flow.next();
        Promise.resolve({
            response: "200 OK",
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "SUCCESS",
                payload: "200 OK",
            }).value;

            const expected = put({
                type: "SUCCESS",
                payload: "200 OK",
            });
            expect(actual).toEqual(expected);
            done();
        });
    });

    test("should dispatch a SUCCESS action with the failure response data", (done: any) => {
        flow.next();
        Promise.resolve({
            error: new Error("500 Error"),
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "FAILURE",
                payload: new Error("500 Error"),
            }).value;

            const expected = put({
                type: "FAILURE",
                payload: new Error("500 Error"),
            });
            expect(actual).toEqual(expected);
            done();
        });
    });
});

describe("can handle customer request 2", () => {

    const action = {
        type: "CUSTOMIZE_REQUEST",
        payload: {
            data: {
                a: 1,
            },
        },
    };

    let request;
    let flow;

    beforeEach(() => {
        request = http.request(
            "POST",
            () => "http://httpstat.us/200",
            {
                requestExtra: {
                    credentials: "omit",
                },
                bodyParserMiddleware: [
                    queryStringBodyParser,
                ],
            },
        );
        flow = fetchSaga(
            request,
            function* (response) {
                const json = yield response.text();
                return {
                    type: "SUCCESS",
                    payload: json,
                };
            },
            function* (error) {
                return {
                    type: "FAILURE",
                    payload: error,
                };
            },
        )(action);
    });

    test("should return a function", () => {
        const actual = typeof request;
        const expected = "function";
        expect(actual).toBe(expected);
    });

    test("should send request", () => {
        const actual = flow.next().value;
        const expected = call(request, action);
        expect(actual).toEqual(expected);
    });

    test("should dispatch a SUCCESS action with the success response data", (done: any) => {
        flow.next();
        Promise.resolve({
            response: "200 OK",
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "SUCCESS",
                payload: "200 OK",
            }).value;

            const expected = put({
                type: "SUCCESS",
                payload: "200 OK",
            });
            expect(actual).toEqual(expected);
            done();
        });
    });

    test("should dispatch a SUCCESS action with the failure response data", (done: any) => {
        flow.next();
        Promise.resolve({
            error: new Error("500 Error"),
        }).then(data => {
            const temp = flow.next(data);
            const actual = flow.next({
                type: "FAILURE",
                payload: new Error("500 Error"),
            }).value;

            const expected = put({
                type: "FAILURE",
                payload: new Error("500 Error"),
            });
            expect(actual).toEqual(expected);
            done();
        });
    });
});

describe("test BodyParsers", () => {
    test("jsonBodyParser", () => {
        expect(jsonBodyParser({ a: "b" })).toEqual("{\"a\":\"b\"}");
    });
    test("queryStringBodyParser", () => {
        expect(queryStringBodyParser({ a: "b", c: "d" })).toEqual("a=b&c=d");
    });
    test("queryStringBodyParser empty", () => {
        expect(queryStringBodyParser(null)).toEqual("");
    });
    test("queryStringBodyParser error", () => {
        const tmp = Object.prototype.hasOwnProperty;
        Object.prototype.hasOwnProperty = () => false;
        expect(queryStringBodyParser({ a: "b" })).toEqual("");
        Object.prototype.hasOwnProperty = tmp;
    });
});

describe("test HttpRequestBuilder", () => {
    test("", () => {
        const httpRequestBuilder = new HttpRequestBuilder()
            .setMethod("POST")
            .setAuthorization("Bearer eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZUUFc4VFFSQWRPdzRoUkRJSmdrZ1VvU0YwNkN4QjZlcGliQ3R3T1NOXC9ORUVDcmU4MlpwTzkzV04zTDdHYnlCVVVLWUtBU0FqK1F2NEpOUHdBQkFWdGFscG16NzZja3laaXE5Vjc3OTY4bWRrN1BZTjVyZUR4UUJIR3RSUHpaTUNFbzJQRnhFRFRJRkhNakp4RVV4VlNreXFhcWJDSENFeE9vUWdGRDRvc05IREwyeVg3cE1LSkdGUmFcL1YwYW1PcFF3U09wQmxQSEhVVWllaURWbm5QdUhVaEZMeFRJclF0ZmlyQ3dEU3NrQ0dRaWpDOUZmUmd6UmNOdFdNNHhUd1o3RnJvVElFT0ZZWVRyV2VrQ0ZhVFBhZWpCRWtuTWE0bFZHZFVHYms3Q0pvYnhTb2VhcWdmWFk2STFwcnZVU2NmWTZKYTNNUVYyOEFZT29UU01DM2h3ZGcrczFMRStUazF5amwwektmUjZUMFF5WkR2TUZrZlwvOGRxSEg4ZGZ4NzBpQU03azRkWGY1UGpkRFJoXC9lXC9uM1hqcm9RbUJnZFNaNkxxc09ZMHl6a2p0M0ZiV1ZmMzUrXC92SGs3TjJMT2F4c0ZZM1wvMzhlNk81M2NxQ2FqbUNoaTVNeU8wUGFnaFBkcmFMNXh0WG0yaFpIVFlWSE1LYjRvWVdoNFhpSTN4blpMU3ZKczNyaXpkc3VydjNKcnRWYlA3Mjc2VFcyWnNvRWJFXC96SjFxYWZRZVVVMm5MYnorcXp5dFdMTU41OHQxbHZaXC9UdFMzU242ellhR2JtWWtyMU92VzJ6RkhXQ1wvWmJUY2R0MzRuZ1NYOG5SblwvZmZqK1wvXC93dXhQWVg2ZjhJVGl0cGR6a1o5RWZhcmVucDZzTFgzNmZaVE9idm9mTGY0RG1WeGMwSXNEQUFBPSIsInN1YiI6InN1Iiwicm9sZXMiOlsiUk9MRV9BQ0NPVU5USU5HIiwiUk9MRV9BRE1JTiIsIlJPTEVfTUFSS0VUSU5HIiwiUk9MRV9NQVJLRVRJTkdfTUFOQUdFUiIsIlJPTEVfTUFSS0VUSU5HX1NUQUZGIiwiUk9MRV9VU0VSIl0sImV4cCI6MTUwNzMxMjU1NCwiaWF0IjoxNTA3MjY5MzU0fQ.JGqyix6Ua5oCIzc8uzylirCBuPEgKdzx11it0MNKwrk")
            .setAcceptType("application/json")
            .setBody({ a: "b" })
            .setUrl("httpL//www.example.com")
            .setQuery({ a: "b" })
            .setContentType("application/json")
            .applyBodyParserMiddleware([queryStringBodyParser])
            .setRequestExtraConfig({
                x: "x",
            });

        httpRequestBuilder.setRequestInit(httpRequestBuilder.getRequestInit()).build();

        expect(httpRequestBuilder.getRequestInit()).toEqual({
            headers:
            {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZUUFc4VFFSQWRPdzRoUkRJSmdrZ1VvU0YwNkN4QjZlcGliQ3R3T1NOXC9ORUVDcmU4MlpwTzkzV04zTDdHYnlCVVVLWUtBU0FqK1F2NEpOUHdBQkFWdGFscG16NzZja3laaXE5Vjc3OTY4bWRrN1BZTjVyZUR4UUJIR3RSUHpaTUNFbzJQRnhFRFRJRkhNakp4RVV4VlNreXFhcWJDSENFeE9vUWdGRDRvc05IREwyeVg3cE1LSkdGUmFcL1YwYW1PcFF3U09wQmxQSEhVVWllaURWbm5QdUhVaEZMeFRJclF0ZmlyQ3dEU3NrQ0dRaWpDOUZmUmd6UmNOdFdNNHhUd1o3RnJvVElFT0ZZWVRyV2VrQ0ZhVFBhZWpCRWtuTWE0bFZHZFVHYms3Q0pvYnhTb2VhcWdmWFk2STFwcnZVU2NmWTZKYTNNUVYyOEFZT29UU01DM2h3ZGcrczFMRStUazF5amwwektmUjZUMFF5WkR2TUZrZlwvOGRxSEg4ZGZ4NzBpQU03azRkWGY1UGpkRFJoXC9lXC9uM1hqcm9RbUJnZFNaNkxxc09ZMHl6a2p0M0ZiV1ZmMzUrXC92SGs3TjJMT2F4c0ZZM1wvMzhlNk81M2NxQ2FqbUNoaTVNeU8wUGFnaFBkcmFMNXh0WG0yaFpIVFlWSE1LYjRvWVdoNFhpSTN4blpMU3ZKczNyaXpkc3VydjNKcnRWYlA3Mjc2VFcyWnNvRWJFXC96SjFxYWZRZVVVMm5MYnorcXp5dFdMTU41OHQxbHZaXC9UdFMzU242ellhR2JtWWtyMU92VzJ6RkhXQ1wvWmJUY2R0MzRuZ1NYOG5SblwvZmZqK1wvXC93dXhQWVg2ZjhJVGl0cGR6a1o5RWZhcmVucDZzTFgzNmZaVE9idm9mTGY0RG1WeGMwSXNEQUFBPSIsInN1YiI6InN1Iiwicm9sZXMiOlsiUk9MRV9BQ0NPVU5USU5HIiwiUk9MRV9BRE1JTiIsIlJPTEVfTUFSS0VUSU5HIiwiUk9MRV9NQVJLRVRJTkdfTUFOQUdFUiIsIlJPTEVfTUFSS0VUSU5HX1NUQUZGIiwiUk9MRV9VU0VSIl0sImV4cCI6MTUwNzMxMjU1NCwiaWF0IjoxNTA3MjY5MzU0fQ.JGqyix6Ua5oCIzc8uzylirCBuPEgKdzx11it0MNKwrk",
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            method: "POST",
            body: "a=b",
            x: "x",
        });
    });
});
