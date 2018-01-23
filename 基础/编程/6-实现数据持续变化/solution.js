"use strict";
// Copyright (c) 2018 Eirc Liu. All Rights Reserved.

var AnimateToNum = require('./module.js')

var numAnim = new AnimateToNum({
    animTime: 20000, //所有数字变动持续的时间(ms)
    initNum: 500, //初始化的数字
    onChange: function(num) {
        console.log(num);
    }
});

numAnim.toNum(520);
