# 概念 #
MVVM模式，顾名思义即Model-View-ViewModel模式。

一句话总结Web前端MVVM:操作数据，就是操作视图，就是操作DOM（所以无须操作DOM）。

MVVM由Model,View,ViewModel三部分构成，Model层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View代表UI组件，它负责将数据模型转化成UI展现出来，ViewModel是一个同步View和Model的对象。

在MVVM架构下，View和Model之间并没有直接的联系，而是通过ViewModel进行交互，Model和ViewModel之间的交互是双向的，因此View数据的变化会同步到Model中，而Model数据的变化也会立即反映到View上。

ViewModel通过双向数据绑定把View层和Model层连接了起来，而View和Model之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM，不需要关注数据状态的同步问题，负责的数据状态维护完全由MVVM来统一管理。

# Vue.js细节 #
Vue.js可以说是MVVM架构的最佳实践，专注于MVVM中的ViewModel，不仅做到了数据双向绑定，而且也是一款相对比较轻量级的JS库，API简洁，很容易上手。下面简单了解一下Vue.js关于双向绑定的一些实现细节：

Vue.js是采用Object.defineProperty的getter和setter，并结合观察者模式来实现数据绑定的。当把一个普通Javascript对象传给Vue实例来作为它的data选项时，Vue将遍历它的属性，用Object.defineProperty将它们转为getter/setter。用户看不到getter/setter，但是在内部它们让Vue追踪依赖，在属性被访问和修改时通知变化。
![](https://raw.githubusercontent.com/egliu/frontend_testquestions/master/%E5%9F%BA%E7%A1%80/%E9%97%AE%E7%AD%94/2-%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%AA%E4%B8%A5%E8%B0%A8%E7%9A%84MVVM%E5%88%86%E5%B1%82/vue.jpg)

- **Observer** 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和setter来实现。
- **Compile** 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
- **Watcher** 订阅者，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。
- **Dep** 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify函数，再调用订阅者的update方法.

从图中可以看出，当执行new Vue()时，Vue就进入了初始化阶段，一方面Vue会遍历data选项中的属性，并用Object.defineProperty将它们转为getter/setter，实现数据变化监听功能；另一方面，Vue的指令编译器Compile对元素节点的指令进行扫描和解析，初始化视图，并订阅Watcher来更新视图，此时Watcher会将自己添加到消息订阅器中(Dep)，初始化完毕。

当数据发生变化时，Observer中的setter方法被触发，setter会立即调用Dep.notify()，Dep开始遍历所有的订阅者，并调用订阅者的update方法，订阅者收到通知后对视图进行相应的更新。
# 参考文章 #
1. [Vue.js 和 MVVM 小细节](http://www.cnblogs.com/onepixel/p/6034307.html)
2. [什么是MVVM](https://github.com/X-Jray/blog/issues/3)
3. [MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)
4. [250行实现一个简单的MVVM](https://saul-mirone.github.io/2016/12/19/simple-mvvm/)