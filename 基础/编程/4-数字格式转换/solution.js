"use strict";
// Copyright (c) 2018 Eric Liu. All Rights Reserved.

const strVec = ["我的账户余额:2,235,467.20", "", 12345, "testOnly"];

/**
 * Implement the parse Money function.
 * @param {String} inputStr The input string.
 * return {Number} The parsed money number.
 */
function parseMoney(inputStr) {
    let rtnValue = null;
    if (typeof inputStr !== "string") {
        console.log("wrong param type, type is " + typeof inputStr);
    } else {
        let re = new RegExp("[^0-9.]", "g");
        let value = inputStr.replace(re, '');
        if (value.length > 0) {
            rtnValue = Number(value);
        }
    }
    return rtnValue;
}

for(let value of strVec) {
    console.log(parseMoney(value));
}
