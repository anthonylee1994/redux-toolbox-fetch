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
