src: 是资源引入的位置，使用src获取资源，是要替代当前元素，会阻塞dom 

link: 是网络资源的位置，从当前元素到需要的资源的一个链接， 不会阻碍dom解析和渲染

### link和@import区别

@import在页面加载完了之后在加载，这可能会导致页面因为重新渲染而闪烁

两者都是外部引用CSS的方式，但是存在一定的区别：
- 区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
- 区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
- 区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
- 区别4：ink支持使用Javascript控制DOM去改变样式；而@import不支持。
