# redux-toolbox-fetch
[![npm version](https://badge.fury.io/js/redux-toolbox-fetch.svg)](https://www.npmjs.com/package/redux-toolbox-fetch)
[![license](https://img.shields.io/github/license/hosos/redux-toolbox-fetch.svg)](https://github.com/hosos/redux-toolbox-fetch/blob/master/LICENSE.md)

redux-toolbox-fetch works with [React Redux](https://github.com/rackt/react-redux) and [Redux Saga](https://github.com/redux-saga/redux-saga) to send a HTTP request easily.

## Installation
```npm i redux-toolbox-fetch```

## Documentation
```
import { HttpRequestBuilder, ContentType, BodyParsers } from "redux-toolbox-fetch";

const getRequest = (content) => new HttpRequestBuilder()
        .setUrl("http://www.gov.hk/")
        .setAcceptType(ContentType.JSON)
        .setMethod(Method.POST)
        .setAuthorization("Bearer %%%香港IT收皮%%%")
        .setQuery(content)
        .toResult();

const postJSON = (content) => new HttpRequestBuilder()
        .setUrl("/your-path-json")
        .applyBodyParserMiddleware([BodyParsers.json])
        .setAcceptType(ContentType.JSON)
        .setContentType(ContentType.JSON)
        .setMethod(Method.POST)
        .setAuthorization("Bearer %%%香港IT收皮%%%")
        .setBody(content)
        .toResult();

const postFormUrlencoded = (content) => new HttpRequestBuilder()
        .setUrl("/your-path-x-www-form-urlencoded")
        .applyBodyParserMiddleware([BodyParsers.queryString])
        .setAcceptType(ContentType.JSON)
        .setContentType(ContentType.FormUrlencoded)
        .setMethod(Method.POST)
        .setAuthorization("Bearer %%%香港IT收皮%%%")
        .setBody({fuck: "world"})
        .toResult();

const getResponse = yield call(getRequest, {fuck: "world"}); // http://www.gov.hk/?fuck=world
const postJsonResponse = yield call(postJSON, {fuck: "world"});
const postFormUrlencodedResponse = yield call(postFormUrlencoded, {fuck: "world"});
```
* 香港 IT 狗到此一遊
* by Hong Kong IT dog 🐶
