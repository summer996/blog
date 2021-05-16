源码经过扫描器（扫描全部的代码）生成token流（就是唯一key,比如每行代码是什么，要做什么）让后利用解释器解析成语法树（AST），这里有两个三个分支
1. 通过绑定器和检查器做了类型检查功能
2. 通过检查器和发射器，生成js代码

### 扫描器
1. createScanner 创建一个扫描器
2. scan 然后调用scan函数进行扫描
3. charCodeAt 利用字符串编码函数，生成各个字符的Unicode编码
4. CharacterCodes/SyntaxKind 根据Unicode编码，获取每个字符对应的token