export default function queryStringBodyParser(body) {
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
