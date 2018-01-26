"use strict";
// Copyright (c) 2018 Eric Liu. All Rights Reserved.

var a1="abcabcdef";
var b1="cde";

var a2="BBC ABCDAB ABCDABCDABDE";
var b2="ABCDABD";

/**
 * Caculate the prefix array of a string.
 * @param {String} inputStr The input string.
 * @return {Array} The prefix array.
 */
function cacPrefixArray(inputStr) {
    if (typeof inputStr !== "string") {
        console.log("typeof inputStr is not a string");
        return;
    } else {
        let prefixArray = [];
        if (inputStr.length > 1) {
            for(let count=1; count<inputStr.length; count++) {
                let str = "";
                for(let jCount=0; jCount<count; jCount++) {
                    str += inputStr[jCount];
                }
                prefixArray.push(str);
            }
        }
        return prefixArray;
    }
}

/**
 * Caculate the postfix array of a string.
 * param {String} inputStr The input string.
 * return {Array} The postfix array.
 */
function cacPostfixArray(inputStr) {
    if (typeof inputStr !== "string") {
        console.log("typeof inputStr is not a string");
        return;
    } else {
        let postfixArray = [];
        let len = inputStr.length;
        if (len > 1) {
            for(let count=1; count<len; count++) {
                let str = "";
                for(let jCount=0; jCount<count; jCount++) {
                    str = inputStr[len-jCount-1] + str;
                }
                postfixArray.push(str);
            }
        }
        return postfixArray;
    }
}

/**
 * Caculate the parital match array of a string.
 * @param {String} inputStr The input string.
 * @return {Array} The parital match array.
 */
function cacPartialMatch(inputStr) {
    if (typeof inputStr!== "string") {
        console.log("typeof inputStr is not a string");
        return;
    } else if (inputStr.length == 0) {
        console.log("inputStr.length == 0");
    } else {
        let partialMatchArray = [0];
        let str = inputStr[0];
        for(let count=1; count<inputStr.length; count++) {
            str += inputStr[count];
            let prefixArray = cacPrefixArray(str);
            let postfixArray = cacPostfixArray(str);
            let value = 0;
            for(let jCount=0; jCount<prefixArray.length; jCount++) {
                if (prefixArray[jCount] == postfixArray[jCount]) {
                    if (prefixArray[jCount].length > value) {
                        value = prefixArray[jCount].length;
                    }
                }
            }
            partialMatchArray[count] = value;
        }
        return partialMatchArray;
    }
}

/**
 * Implement kmp algorithm.
 * @param {String} lStr The longer string.
 * @param {String} sStr The shorter string.
 * @return {Boolean} Contained or not.
 */
function kmpMatch(lStr, sStr) {
    if ((typeof lStr !== "string") || (typeof sStr !== "string")) {
        console.log("typeof lStr or sStr is not a string");
        return;
    } else if (lStr.length < sStr.length) {
        console.log("lStr.length is smaller than sStr.length!");
        return;
    } else {
        let partialMatchArray = cacPartialMatch(sStr);
        // let sCount = 0;
        let lCount = 0;
        while((lCount + sStr.length) < lStr.length) {
            if (sStr[0] !== lStr[lCount]) {
                lCount++;
            } else {
                if (sStr.length === 1) {
                    return true;
                } else {
                    let matched = true;
                    for(let sCount=1; sCount<sStr.length; sCount++) {
                        if (sStr[sCount] !== lStr[lCount+sCount]) {
                            lCount += (sCount - partialMatchArray[sCount-1]);
                            matched = false;
                            break;
                        }
                    }
                    if (matched === true) {
                        console.log("The matched index is "+lCount);
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

console.log(kmpMatch(a1,b1));
console.log(kmpMatch(a2,b2));
