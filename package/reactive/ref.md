对于基本数据类型，函数传递或者对象解构时，会丢失原始数据的引用，换言之，我们没法让基本数据类型，或者解构后的变量(如果它的值也是基本数据类型的话)，成为响应式的数据。

实就是想一个数字、一个字符串是响应式的，或者就是想利用解构的写法。那怎么办呢？只能通过创建一个对象，也即是源码中的Ref数据，然后将原始数据保存在Ref的属性value当中，再将它的引用返回给使用者。既然是我们自己创造出来的对象，也就没必要使用Proxy再做代理了，直接劫持这个value的get/set即可，这就是ref函数与Ref类型的由来