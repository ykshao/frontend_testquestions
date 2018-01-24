"use strict";
// Copyright (c) 2018 Eric Liu. All Rights Reserved.

var url = "http://api.com/api";

/**
 * Implement a custom fetch function.
 * @inputUrl {String} inputUrl The input url.
 * @return {Object} The Promise object.
 */
function CustomFetch(inputUrl) {
    let req = new Request(inputUrl, {
        method: "GET",
        header: {
            "token": "xxx"
        }
    });
    return fetch(req).then(function(response) {
        return new Promise(function(resolve, reject) {
            if (response.success === true) {
                resolve(response.data);
            } else {
                reject({message: response.message, code: response.code});
            }
        });
    })
}

CustomFetch(url).then((data) => {
    console.log(data); // 如果后台返回true
}).catch((e) => {
    console.log(e.message); // 输出"查询错误"
});