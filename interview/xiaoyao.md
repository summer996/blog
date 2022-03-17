### mvc mvvm区别
MVVM与MVC最大的区别就是：它实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变。 数据流向不单一

### react hook实现原理


### react hook是如何关联数据的
//https://developer.aliyun.com/article/784027#slide-6
hook是相互独立的，不同组件调用同一个hook也能保证各自状态的独立性。
```js
export function useState(initstate) {
  let dispatcher = resolveDispatcher();
  return dispatcher.useState(initstate);
}

function resolveDispatcher() {
  return ReactCurrentDispatcher.current;
}

const ReactCurrentDispatcher = {
  current: null
}
```
#### react是如何保证多个useState相互独立的？
react根据useState出现的顺序来定的，

### ts和js的区别
编译时进行静态类型的校验，ts核心就是静态类型
- JavaScript 代码可以在无需任何修改的情况下与 TypeScript 一同工作，同时可以使用编译器将 TypeScript 代码转换为 JavaScript。
- TypeScript 通过类型注解提供**编译时**的静态类型检查。
- TypeScript 中的数据要求带有明确的类型，JavaScript不要求。
优点:
- 静态输入：静态类型时一种功能，可以在开发人员编写脚本的时候就检查错误
- 大型项目的开发
- 更好的协作
- 更强的生产力

### d.ts d：declare，ts的声明文件
假如ts引入了js文件，这时候就不知道变量的具体类型，为了告诉ts变量的类型，因此就有了d.ts文件


### react-redux 中的connect实现
- provider：使react组件可被连接
- connect：时react组件和redux的store真正连接起来
  - ```connect(mapStateToProps, mapDispatchToProps)```
  
mapStateToProps(state, ownProps) : stateProps；这个函数允许我们将 store 中的数据作为 props 绑定到组件上。
ownProps：是组件自己的props， 当state或者ownProps受到影响，都会重新调用mapStateToProps，然后计算出一个新的stateProps,再传递给组件
```js
const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}
```

mapDispatchToProps(dispatch, ownProps): dispatchProps, 是将actions作为props绑定到组件上；

原理解析：connect之所以会成功，是因为provider组件：
- 再原应用组件上包裹一层，是原来整个应用称为provider的子组件
- 接收redux的store作为props,通过context对象传递给子孙组件上的connect

connect做了什么？
真正连接了redux和react，它包裹在我们容器组件的外一层，它接收provider提供的store里面的state和dispatch，传给一个构造函数，然后再返回一个对象，在以属性的形式传给我们的容器组件

源码：
connect是一个高阶函数，首先传入mapstatetoprops,mapdispatchtoprops，然后返回一个生产组件的函数（wrapWithConnect），再将真正的组件作为参数传入wrapWithConnect，就会生成一个经过包裹的connect组件，拥有以下特点：
- 可以通过props.store获取祖先的store
- props包括stateProps、dispatchProps、parentProps,合并在一起得到nextState，作为props传给真正的Component
```js
//connect返回了一个函数wrapWithConnect，然这个函数再接收真正的需要被包裹的组件，然后返回组件
export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  return function wrapWithConnect(WrappedComponent) {
    class Connect extends Component {
      constructor(props, context) {
        // 从祖先Component处获得store
        this.store = props.store || context.store
        this.stateProps = computeStateProps(this.store, props)
        this.dispatchProps = computeDispatchProps(this.store, props)
        this.state = { storeState: null }
        // 对stateProps、dispatchProps、parentProps进行合并
        this.updateState()
      }
      shouldComponentUpdate(nextProps, nextState) {
        // 进行判断，当数据发生改变时，Component重新渲染
        if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
          this.updateState(nextProps)
            return true
          }
        }
        componentDidMount() {
          // 改变Component的state
          this.store.subscribe(() = {
            this.setState({
              storeState: this.store.getState()
            })
          })
        }
        render() {
          // 生成包裹组件Connect
          return (
            <WrappedComponent {...this.nextState} />
          )
        }
      }
      Connect.contextTypes = {
        store: storeShape
      }
      return Connect;
    }
  }
```



### react中的懒加载
webpack检查到import语法，会进行自动的代码分割，使用这种动态导入语法代替以前的静态引入，可以让组件再渲染的时候，再去加载组件对应的资源。

结合wepback的coding split，通过react提供的layz()动态加载组件，返回一个resolved的promise，然后只需要再结合suspense来加载即可实现懒加载，fallback是必须的，如果不想要，可以设置为null;