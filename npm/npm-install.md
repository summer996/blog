npm模块的安装机制：
- 发出npm install命令
- 查询node_modules目录下是否存在已经指定的模块
  - 若存在，则不会重新安装
  - 不存在
    - npm向registry查询模块压缩包的网址
    - 下载压缩包，存放在根目录下的.npm目录里
    - 解压压缩包到当前项目的node_modules目录里

npm实现原理：
- 输入npm install命令并敲下回车，会经历如下几个阶段
  - 如果npm定义了preinstall，就会先执行
  - 确定依赖，也就是dependencies 和 devDependencies 属性中直接指定的模块，工程本身就是整颗树依赖的根节点，每个首层依赖模块都是根节点下面的以可子树
  - 获取模块
    - 该过程为递归过程
  - 当一个模块被多颗依赖树依赖时，会放到node_module下
  
  安装模块：这一步将更新工程中的node_module并执行模块中的生命周期函数