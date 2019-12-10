Vuex 内部采用了 new Vue 来将 Store 内的数据进行「响应式化」，所以 Vuex 是一款利用 Vue 内部机制的库，与 Vue 高度契合，与 Vue 搭配使用显得更加简单高效，但缺点是不能与其他的框架（如 react）配合使用

## 要点
- Vue状态管理容器
- Vuex是依赖Vue核心实现数据的”响应式化“
- Vuex不能与其他框架配合使用

## 运行机制
- 通过use机制注入vue实现依赖然后全局保存vue，将store实例通过vue带入进去（this.$options.store）
- 通过mixin将vuexInit混淆到Vue实例的beforeCreate钩子中，每个实例能访问$store对象

## 代码
```
let Vue;

class Store {
    constructor () {
        this._vm = new Vue({
            data: {
                $$state: this.state
            }
        })
    }

    commit (type, payload, _options) {
        const entry = this._mutations[type];
        entry.forEach(function commitIterator (handler) {
            handler(payload);
        });
    }

    dispatch (type, payload) {
        const entry = this._actions[type];

        return entry.length > 1
        ? Promise.all(entry.map(handler => handler(payload)))
        : entry[0](payload);
    }
}

// 用于在每个vue组件实例中注册store实例
function vuexInit () {
    const options = this.$options;
    if (options.store) { // 根节点组件
        this.$store = options.store;
    } else {
        this.$store = options.parent.$store;
    }
}

export default install (_Vue) {
    Vue = _Vue;
    Vue.mixin({ beforeCreate: vuexInit });
}
```