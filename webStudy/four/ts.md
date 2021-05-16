### ts编译原理

### ts实战里的各种实战，能否运用到实际工作
1. enum 枚举
2. type interface
3. 联合类型 |(其中一种就可以)
4. & 交叉类型
5. typeof 获取类型，获取一个定义好的函数或者变量
6. keyof 可以获取对象中的所有key值
7. in 用来遍历，枚举类型
8. extends 继承， 复用
9. Partial<T>  把所有值都变为可选项
10. Require<T> 把所有选项都变为必选项
11. Record<K, T> (类型传参，用尖括号)  Record<K extends keyof any, T>作用是将K中所有属性的值，转为T类型