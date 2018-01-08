'use strict';
// Copyright (c) 2018 Eric Liu. All Rights Reserved.

// url is a string which is going to be parsed  
const url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled';

/**
 * Fill the structured parsed object.
 * @param {Object} obj The structured object which is going to be filled.
 * @param {String} paramKey The key string.
 * @param {String} paramValue_opt Optional, the value string.
 */
function FillObj(obj, paramKey, paramValue_opt) {
    if (typeof obj === 'object' && typeof paramKey === 'string') {
        if (paramValue_opt === undefined) {
            paramValue_opt = true;
        } else if (!isNaN(paramValue_opt)) {
            paramValue_opt = Number(paramValue_opt);
        }
        if (obj.hasOwnProperty(paramKey)) {
            let paramValue = obj[paramKey];
            if (paramValue instanceof Array) {
                paramValue.push(paramValue_opt);
                obj[paramKey] = paramValue;
            } else {
                obj[paramKey] = [paramValue, paramValue_opt];
            }
        } else {
            obj[paramKey] = paramValue_opt;
        }
    }
}

/**
 * Parse the input url.
 * @param {String} urlPath The input url which is going to be parsed.
 * @return {Object} The structured parsed object.
 */
function ParseParam(urlPath) {
    let paramObj = {};
    if (typeof urlPath !== 'string') {
        console.log('Wrong param: the type of input url is not string.');
    } else {
        const questionMarkIndex = urlPath.indexOf('?');
        if (questionMarkIndex !== -1) {
            const paramPath = urlPath.substring(questionMarkIndex+1);
            const paramVec = paramPath.split('&');
            for(let param of paramVec) {
                const unitVec = param.split('=');
                if (unitVec.length === 1) {
                    FillObj(paramObj, decodeURIComponent(unitVec[0]));
                } else if (unitVec.length === 2) {
                    FillObj(paramObj, decodeURIComponent(unitVec[0]), decodeURIComponent(unitVec[1]));
                }
            }
        } 
    }
    return paramObj;
}

console.log(ParseParam(url));