'use strict';
// Copyright (c) 2018 Eric Liu. All Rights Reserved.

const template = '我是{{name}},年龄{{age}},性别{{gender}}';
const obj = {
    name: 'xiaoming',
    age: 18
}

/**
 * Implement a simple template engine.
 * @param {String} tpl The template format.
 * @param {Object} data The data object.
 * @return {String} The output string.
 */
function render(tpl, data) {
    if (typeof tpl == 'string' && typeof data == 'object') {
        const reg = /\{\{(.+?)\}\}/g;
        return tpl.replace(reg, function(m, p1) {
            return data[p1];
        })
    } else {
        console.log('wrong param!');
    }
}

console.log(render(template, obj));