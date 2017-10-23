export function queryStringBodyParser(body: any) {
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

export function jsonBodyParser(body: any) {
    return JSON.stringify(body);
}
