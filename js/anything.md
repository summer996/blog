抽象语法树（AST）：是前端js一个非常重要的知识点

AST解析流程：
1、生成AST
2、修改AST
3、AST转为普通代码

一段代码转化为AST是一个对象，该对象会有一个顶级的type属性Program,第二个属性是body是一个数组
body中存放的每一项都是一个对象，里面包含了对于该语句的描述对象
```
type：  描述该语句的类型，（变量声明的语句，变量是VariableDeclaerator, FunctionDeclarator）
kind:   变量什么的关键字（var let function）
declaration:  声明内容的数组，里面的每一项都是一个对象
          type:  描述该语句的类型
          id：   描述变量名称的对象
              type:  定义
              name: 变量的名字
          init:  初始化变量值的对象
              type: 类型
              value: 值 is tree，不带引号
              row: "\"is tree "\"带引号
```
```
var a = 'is tree';
//解析为AST
{
  type: 'Program',
  body: [
    {
      type: 'VariableDeclaerator',
      kind: 'var',
      decalarations: [
        {
          type: 'VariableDeclaerator',
          id: {
            type: 'Identifier',
            name: 'a'
          },
          init: {
            type: 'Literal',
            value: 'is tree',
            row: '\"is tree\"'
          }
        }
      ]
    }
  ]
}
```

