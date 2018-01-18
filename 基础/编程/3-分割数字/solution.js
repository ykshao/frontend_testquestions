"use strict";
// Copyright (c) 2018 Eric Liu. All Rights Reserved.

// numStrVec is a vector contains all the string 
// numbers which are going to be parsed.
const numStrVec = ["1234.56", "123456789", "123test", 4567, "testnumber"];

/**
 * Implement the parse number split function.
 * @param {String} numStr The numStr is going to be parsed.
 * @return {String} The parsed numStr.
 */
function parseToMoney(numStr) {
    let rtnStr = null;
    if (typeof numStr !== "string") {
        console.log("wrong param, type is " + typeof numStr);
    } else if (isNaN(numStr)) {
        console.log("wrong param, param is not a number, is " + numStr);
    } else {
        let re = new RegExp("(\\d+?)(?=(\\d{3})+($|\\.))", 'g');
        rtnStr = numStr.replace(re, "$1,");
    }
    return rtnStr;
}

for (let value of numStrVec) {
    console.log(parseToMoney(value));
}
