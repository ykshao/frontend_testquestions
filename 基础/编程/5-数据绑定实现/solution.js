"use strict";
// Copyright (c) 2018 Eric Liu. All Rights Reserved.

let a = {
    name: "xiaoming",
    age: 18
};

function b () {
    console.log("a的值发生变化,name=" + this.name + ",age=" + this.age);
}

function bindData(target, event) {
    for(let key in target) {
        if (target.hasOwnProperty(key)) {
            (() => {
                let value = target[key];
                Object.defineProperty(target, key, {
                    get: function() {
                        return value;
                    },
                    set: function(_value) {
                        if (_value !== value) {
                            value = _value;
                            event.call(this);
                        }
                    }
                })
            })();
        }
    }
}

bindData(a, b);
a["name"] = "xiaoming";
a["name"] = "xiaohong";
a["age"] = 18;
a["age"] = 19;

// 个人觉得上面的方式不太标准，现实中的做法应该是把数据属性和访问器属性分开处理
// 实现方式如下：

let a2 = {};
Object.defineProperties(a2, {
    _name: {
        value: "xiaoming",
        writable: true,
        enumerable: true,
        configurable: true
    },
    _age: {
        value: 18,
        writable: true,
        enumerable: true,
        configurable: true
    },
    name: {
        get: function() {
            return this._name;
        },
        set: function(value) {
            if (value !== this._name) {
                this._name = value;
                b.call(this);
            }
        },
        enumerable: true,
        configurable: true
    },
    age: {
        get: function() {
            return this._age;
        },
        set: function(value) {
            if (value !== this._age) {
                this._age = value;
                b.call(this);
            }
        },
        enumerable: true,
        configurable: true
    }
});

a2["name"] = "xiaoming";
a2["name"] = "xiaohong";
a2["age"] = 18;
a2["age"] = 19;
