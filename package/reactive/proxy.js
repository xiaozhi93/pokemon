/*
// let data = { foo: 'foo'}; // 要代理的对象
let data = [1, 2, 3] // 要代理的数组,,push会触发多次，更改下标，更改长度属性

// 拓展数据功能，代理对原始数据的操作
let p = new Proxy(data, {
  get(target, key, receiver) {
    console.log("get value:", key)
    return target[key]
  },
  set(target, key, value, receiver) {
    console.log("set value", key, value)
    target[key] = value

    return true
  }
})

// p.foo = 123
p.push(4)
*/

/*
// push, unshift 触发多次set执行，同时也引发get操作
let data = [1, 2, 3]
let p = new Proxy(data, {
  get(target, key, receiver) {
    console.log("get value:", key, target[key])
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log("set value:", key, value)
    return Reflect.set(target, key, value, receiver)
  }
})

p.push(4)
*/

// 只能代理一层，触发get
/* let data = { foo: "foo", bar: { key: 1 }, ary: ["a", "b"] }
let p = new Proxy(data, {
  get(target, key, receiver) {
    console.log("get value:", key)
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log("set value:", key, value)
    return Reflect.set(target, key, value, receiver)
  }
})
p.bar.key = 2 */

// 使用Reflect返回trap默认行为，
// 对于set操作，可能引发代理对象的属性更改，导致set执行多次
// proxy只能代理对象中的一层，对于对象内部的操作set未能感知，但是get会被执行

// 使用setTimeout解决重复trigger，，，类似debounce
/*
function reactive(data, cb) {
  let timer = null
  return new Proxy(data, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        cb && cb()
      }, 0)
      return Reflect.set(target, key, value, receiver)
    }
  })
}

let ary = [1, 2]
let p = reactive(ary, () => {
  console.log("trigger")
})
p.push(3)
*/
// vue通过key是否是target自身属性，以及设置val是否跟taget[key]相等 可以确定trigger的类型，并且避免多余的trigger

// 解决数据深度侦测

function reactive(data, cb) {
  let res = null
  let timer = null

  res = data instanceof Array ? [] : {}

  for (let key in data) {
    if (typeof data[key] === "object") {
      res[key] = reactive(data[key], cb)
    } else {
      res[key] = data[key]
    }
  }

  return new Proxy(res, {
    get(target, key) {
      return Reflect.get(target, key)
    },
    set(target, key, val) {
      let res = Reflect.set(target, key, val)
      clearTimeout(timer)
      timer = setTimeout(() => {
        cb && cb()
      }, 0)
      return res
    }
  })
}

let data = { foo: "foo", bar: [1, 2] }
let p = reactive(data, () => {
  console.log("trigger")
})
p.bar.push(3)

// 总结
// 使用proxy实现响应式系统
// proxy存在触发多次的问题及只能代理一层
// 触发多次可以使用setTimeOut模拟防抖触发一次，还可以检测key是否为自身属性，以及设置val是否跟target[key]相同
// 只能代理一层，，做到深度数据侦测，使用递归代理 或者 判断了 Reflect 返回的数据是否还是对象，如果是对象，则再走一次 proxy ，从而获得了对对象内部的侦测。
