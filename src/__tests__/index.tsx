import { http, fetchSaga } from "../index";
describe("no test now", () => {
    it("can handle 500", function*(done) {
        yield fetchSaga(
            http.get(() => "http://httpstat.us/500"),
            function*(response: any) {
                const data = yield response.text();
                return {
                    type: "SUCCESS",
                    payload: data,
                };
            },
            (error: any) => {
                return {
                    type: "FAILURE",
                    payload: error,
                };
            },
        )({
            type: "123",
            payload: {},
        });
    });
});
