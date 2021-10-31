### axios拦截器
发生在请求或响应在被then或catch处理前拦截他们
```js
//请求前的拦截处理
axios.interceptors.request.use((config) => {
  //请求之前处理数据
  return config;
}, (error) => {
  //对请求错误做些什么
  return Promise.reject(error)
})

//响应前的拦截处理
axios.interceptors.response.use((response) => {
  //响应前的处理
  return response;
}, (error) => {
  //超过2xx的状态码都会触发，对错误响应做些什么
  return Promise.reject(error)
})

```

### 常用状态码
- 304 not modified，资源没有修改
- 301 永久重定向，会把post修改为get，需谨慎操作，如果设置了301，过段时间想取消，由于浏览器有了缓存，还是会重定向
- 302 临时重定向，但是会把post修改为get
- 307 临时重定向，不会修改method
- 400 前端提交的数据格式和后端定义的不一样，语义错误，服务器无法理解，请求参数有问题，字段类型错误，数据格式错误
- 403 没有权限
- 404 路径、端口、ip错误
- 500 服务器错误，找后台处理
- 502 服务器暂时不可用 作为网关或者代理工资的服务器尝试执行请求时，从上游服务器收到无效响应，
- 503 服务器过载 服务器过忙，无法处理当前请求，临时的，一会就好

### 浏览器缓存，前端后端分别可以怎么设置
前端：因为浏览器发送请求的时候，会通过资源的url来判断是否读取缓存中的内容，这就会导致，有时候服务器资源更新了，但是浏览器还是读取缓存，所以就可以再请求的时候，**添加随机数或者时间戳**，让浏览器以为每次都是一个新的请求
后端在header设置cache-control的值，就可以控制浏览器的缓存模式

cache-control的值：
- no-cache **协商缓存**，可以在客户端进行缓存资源，但需要每次都要和服务端做过期校验，通过返回200（资源过期，返回新资源） 或者304(使用客户端缓存)
  - last-modified/if-modified-since，根据最后修改的时间，会存在误差（比如打开文件，并没有修改内容，也会更新last-modified）;
    - request header, **if-modified-since**
    - response header, **last-modified**
  - etag/if-none-match，根据内容生成的hash值
    - request header, **if-none-match**
    - response header, **Etag**
- max-age / expires，**强缓存**，max-age优先级高于expires
  - max-age = xxx, public，客户端和代理服务器都可以缓存资源
  - max-age = xxx, private，客户端可以缓存资源，代理服务器不可以
  - max-age = xxx, immutable，直接读取缓存
- no-store 永远都不会在客户端缓存
- public 表明其他用户可以缓存
- private 缓存服务器对特定的用户提供可以缓存的服务


### 原型链， object array
```js
var a = [];
a.__proto__.contructor; //f Array(){};
a.__proto__.contructor.prototype === Array.prototype; //true

var obj = {};
obj.__proto__.contructor; //f Object(){};
obj.__proto__.contructor.prototype === Object.prototype; //true
```

### 对象
- Object.freeze()，冻结一个对象，冻结之后，就不可逆转，不可任何操作
- Object.fromEntries()；Object.fromEntries([["name", 'fadf']]) //{name: 'fadf'}把数组转为为对象
- Object.entries()，返回给定对象可枚举的键值对**数组**
- Object.getOwnPropertyDescriptor()；一个由属性描述符组成的对象， 获取属性对应的描述符
- Object.defineProperty(obj, property, config);直接新增或者修改对象上的某个属性，并且返回该对象
- Object.getOwnPropertyNames()；方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
- Object.defineProperties(obj, props),直接再对象上定义或者修改属性，并且返回该对象
```js
let obj = {a: 111};
Object.defineProperties(obj, {
  name: {
    value: 'lichunying',
    writable: true, // true可写，默认false
    enumerable: true, //可枚举，默认false
    configurable: true, //可以改变并且可删除 默认false
    get: () => {}, //getter函数
    set: () => {} //setter函数
  },
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
})

```
- Object.hasOwnProperty() ==> true/false; 判断对象是否有某个属性
定义getters 和setters
```js
let obj = {
  a: 2,
  get b(){
    return this.a + 1;
  },
  set c(value) {
    this.a = this.a + value;
  }
}
obj.a;
```


### react生命周期，16.3版本新增
**废弃了**componentWillMount、componentWillReceiveProps 和 componentWillUpdate这三个方法，如果还要使用，需要添加unsafe前缀

**添加了**getDerivedStateFromProps 、 getSnapshotBeforeUpdate


### 前端攻击
- token不是防xss而是防止csrf的，csrf攻击的原因就是浏览器会自动带上cookie,但是不会自动携带token
- xss：跨站脚本攻击，攻击者把恶意代码通过各种方式注入到用户页面，就可以获取页面信息，然后进行发请求等一些操作
- csrf（cross site request forgery）：（使用token防止）跨站请求攻击，简单来说就是攻击者引诱用户的浏览器去访问一个用户曾经认证过的网站并进行一些操作，如发短信，消息，购买等，由于以前认证过，所以浏览器会认为是真正用户在操作，利用了web中用户身份验证的一个漏洞：**简单的身份验证只能保证请求发自某个用户，却不能保证请求本身是用户自愿发出的**

### token比cookie更安全的原因
- cookie：警察看你的身份证，然后给你一个编号，后续的任何操作，都是通过编号来表明你是谁
- token：直接给警察看身份证，任何操作都是通过身份证直接操作
- cookie：登录之后，后端会生成一个sessionid放在cookie中返回给客户端，并且这个sessionid一直存在服务端，以后客户端每次请求都携带这个sessionid，服务端通过这个sessionid来判断身份，如果别人拿到了这个cookie就能拿到sessionid，完全可以取代你做其他请求。
- token：登录之后，后端会返回一个token，以后的每次请求，前端都需要手动加上这个token，即使被劫持，由于jwt+ip的方式，也会是一个无效的token;


原因：
- 浏览器在请求时，会自动带上cookie,所以crsf才管用
- token,不会自动携带，并且token是放在jwt里面发送给客户的，不能通过脚本拿到，加上jwt+ip的方式，可以防止被劫持，即使劫持，也是无效的jwt

### 跨域， Authorization token(jwt生成),  withCredentials作用
- 不用携带凭证（cookie, token）的跨域请求，只需要设置Access-Control-Allow-Origin即可，
- 但是携带凭证（带cookie,token）的跨域请求，
  - **后端**需要设置Access-Control-Allow-Origin、 Access-Control-Allow-Credentials： true
  - **前端**需要设置withCredentials: true这样浏览器才能正常的发送cookie，服务器才能正常接收
options CORS请求预检；

跨域获取cookie
```js
//服务器端
res.header('Access-Control-Allow-Credentials', 'true') //还有一个，设置为true时，才可以获取response的值

//浏览器端
instance({
    url: '/put',
    method: 'put',
    //新增withCredentials
    withCredentials: true,
    headers:{
        'X-Custom-Header': 'xieyufei-head'
    },
    data:{
        url: 'xieyufei.com'
    }
})

```
withCredentials设置为true，表明跨域是否携凭据信息（cookie、HTTP认证及客户端SSL证明等），实际的用途就是，请求是否要带cookie，它表明是可以发送cookies, authorization header等信息校验的字段，统一站点下设置为true不生效。

origin请求header字段，该字段表明了请求来自哪个站点，该字段指示服务器名称，并不包含任何路径信息。该字段用于cors请求或者post请求，处理不包含路径信息，该字段与referer首部字段相似。

### useState是同步还是异步
setState并不是真正的异步函数，而是通过队列延迟操作来实现的，通过isBatchingUpdates的值，来判断setState是先存进队列中，还是直接更新，如果为true,就进入队列，如果为false,就立即更新也就是同步操作

再react的生命周期函数和合成事件中，就是true，异步更新。再addEventLister, setTimeout, SetInterval这种原生事件就同时false,同步更新



## git rebase 和git merge区别