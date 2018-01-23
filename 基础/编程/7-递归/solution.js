"use strict";
// Copyright (c) 2018 Eric Liu. All Rights Reserved.

var getJSFiles = function(path) {
    let result = [];
    if (existsSync(path)) {
        if (isDirectory(path)) {
            const files = readDirSync(path);
            files.forEach((file) => {
                result = result.concat(getJSFiles(file));
            });
        } else if (/\.js&/.test(path)) {
            result.push(path);
        }
    }
    return result;
}