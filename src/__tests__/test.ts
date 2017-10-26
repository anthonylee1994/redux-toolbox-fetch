import { put, call, select } from "redux-saga/effects";
import { http, fetchSaga } from "../index";

describe("can handle get request", () => {

    const action = {
        type: "GET_REQUEST",
        payload: {},
    };

    let request;
    let flow;

    beforeEach(() => {
        request = http.get(
            function*(response: Response) {
                const text = yield response.text();
                return {
                    type: "SUCCESS",
                    payload: text,
                };
            },
            error => {
                return {
                    type: "FAILURE",
                    payload: error,
                };
            },
            {
                urlParser: () => "http://httpstat.us/200",
            },
        );

        flow = fetchSaga(request)(action);
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

    test("should dispatch a SUCCESS action with the response data", (done: any) => {
        const actual = flow.next().next().value;
        const expected = put({
            type: "SUCCESS",
            payload: "200 OK",
        });
        expect(actual).toEqual(expected);
    });
});
