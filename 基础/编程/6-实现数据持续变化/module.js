"use strict";
// Copyright (c) 2018 Eric Liu. All Rights Reserved.

module.exports = class AnimateToNum {
    constructor(props) {
        console.log(typeof props.onChange);
        if (props !== undefined && props.constructor === Object) {
            this.animTime = props.animTime;
            this.initNum = props.initNum;
            this.onChange = props.onChange;
        }
    }

    toNum(value) {
        let diffTimes = 0;
        let increDir = true;
        if (value >= this.initNum) {
            diffTimes = value - this.initNum;
            increDir = true;
        } else {
            diffTimes = this.initNum - value;
            increDir = false;
        }
        if (diffTimes != 0) {
            let aveChangeTime = Math.floor(this.animTime / diffTimes);
            let count = 0;
            let startTime = 0;
            let curValue = this.initNum;
            let callback = this.onChange;
            (function execFunc() {
                if (count <= diffTimes) {
                    if (count == 0) {
                        startTime = Date.now();
                        count++;
                        callback(curValue+':'+startTime);
                        setTimeout(execFunc, aveChangeTime);
                    } else {
                        count++;
                        if (increDir === true) {
                            curValue++;
                        } else {
                            curValue--;
                        }
                        let curTime = Date.now();
                        callback(curValue+':'+curTime);
                        if (count === diffTimes) {
                            if (curTime > startTime+(count-1)*aveChangeTime) {
                                execFunc();
                            }
                        }
                        if (curTime >= startTime+count*aveChangeTime) {
                            execFunc();
                        } else if (curTime <= startTime-(count-2)*aveChangeTime) {
                            setTimeout(execFunc, 2*aveChangeTime);
                        } else {
                            setTimeout(execFunc, aveChangeTime);
                        }
                    }
                }
            })();
        } else {
            this.onChange(value);
        }
    }
};
