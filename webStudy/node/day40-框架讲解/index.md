### express koa2区别
相同点：
- 两个框架都是http进行了封装，主要api都差不多，同一批人员的完成

不同点：
- express内置了很多中间件可以使用，koa没有
- express包含了路由，视图渲染等特性，koa只有http模块
- express的中间模型为线性，而koa的中间模型为u型，也可以成为洋葱模型
- express通过回调实现异步函数，再多个回调，中间件种写起来容易逻辑混乱， 而koa通过genertator和async/await使用同步的方式处理异步，明显好于callback和promise;

#### 优缺点
##### express
**优点**：线性逻辑，通过中间件形式把因为逻辑细分，简化，一个请求进来经过一系列中间件处理后，再响应给用户，清晰明了

**缺点**：基于callback组合业务逻辑，业务逻辑复杂时嵌套过多，异常捕获困难

##### koa
**优点**:借助co和generator，很好的解决了异步流程控制和异常驳货的问题，其次，koa把express内置的router,view等功能都移除了，使得框架本身更轻量

**缺点**：社区相对较小

### node 页面模板

### sequelize

### mongooes和mongode的关系
mongodb是一个基于分布式文件存储的文档型数据库，mongodb是一个介于关系数据库和非关系数据库之间的产品。

mongoose是再node.js异步环境下对mongodb进行便捷操作的对象模型工具，mongoose是针对mongodb操作的一个对象模型库，封装了mongodb对文档的增删改查等方法。