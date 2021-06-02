export const NODE_FLAG = {
  EL: 1,
  TEXT: 1 << 1, //2
}

const createText = (text) => {
  return {
    type: '',
    props: {
      nodeValue: `${text}`
    },
    $$: { flag: NODE_FLAG.TEXT }
  }
}

const normalize = (children = []) => {
  return children.map(child => {
    return typeof child === 'string' ? createText(child) : child;
  })
}


const createVnode = (type, props, key, $$) => {
  //step1 这就是虚拟节点的结构，虚拟dom就是有虚拟节点组成的
  return {
    type,
    props,
    key,
    $$
  }
}

export const h = (type, props, ...kids) => {
  /**
   * step2 定义生成vDom对象的方法
   * type有5中类型
   * 1、svg
   * 2、html
   * 3、Fragment，
   * 4、Portal
   * 5、组件
   */
  props = props || {};
  
  let key = props.key || void 0;

  kids = normalize(props.children || kids);

  if (kids.length) {
    props.children = kids.length === 1 ? kids[0] : kids
  }

  const $$ = {};
  $$.el = null;
  $$.flag = type === '' ? NODE_FLAG.TEXT : NODE_FLAG.ELEMENT;

  return createVnode(type, props, key, $$);
}

/**
 * h type的判断方法
 */
//添加Fragment的标识
export const Fragment = Symbol();

//添加Portal的标识
export const Portal = Symbol();

const hType = (type, props, ...kids) => {
  let flag = null;

  //1、判断当前类型未 svg 还是 html
  if (typeof type === 'string') {
    flag = tag === 'svg' ? VNodeTypes.ELEMENT_SVG : VNodeTypes.ELEMENT_HTML;
  } else if (type === Fragment) {
    //2、判断当前类型是否未fragment标签
    flag = VNodeTypes.FRAGMENT;
  } else if (tag === Portal) {
    //3、判断当前是否为Portal
    flag = VNodeTypes.PORTAL;
    //需要注意的是，类型为Portal的VNode，其type属性存储的是Portal挂载的目标，即target， 
    //因此，在经过编译之后，把target数据存储在VNodeData中，及type = props && props.target;
    type = props && props.target;
  } else {
    //当以上条件都不满足时，则该类型就可能是一个组件(纯文本先忽略)
    if (type !== null && typeof type === 'object') {
      flag = type.functional
        ? VNodeTypes.COMPONENT_FUNCTIONAL        //函数式组件
        : VNodeTypes.COMPONENT_STATEFUL_NORMAL // 有状态组件
    } else if (typeof type === "function") {
      flag = type.prototype && type.prototype.render
        ? VNodeTypes.COMPONENT_STATEFUL_NORMAL  // 有状态组件
        : VNodeTypes.COMPONENT_FUNCTIONAL    //函数式组件
    }

    //以上就可以判断vnode的正确类型
  }

  return {
    flag,
  }
}


/**
 * h children的判断方法
 * children有4中类型
 * 1、children是一个数组  h('ul', null, [h('li'), h('li')])
 * 2、children是一个VNode对象  h('div', null, h('span'))
 * 3、没有children  h('div')
 * 4、children 是一个文本  h('div', null, '我是文本')
 */
const normalizeVNode = (children = []) => {
  
  return children.map((item, index) => {
    if (item.key === null) {
      //如果原来的vnode没有key,则使用竖线（|）与该vnode在数组中的索引拼接而成一个字符串作为key
      item.key = `|${index}`;
    }

    return item;
  })
}

const createTextVNode = (text) => {
  return {
    _isVNode: true,
    flags: VNodeTypes.Text,
    type: null,
    props: null,
    children: text,
    childrenFlag: ChildrenFlags.NO_CHILDREN,
    el: null
  }
}
const hChildren = (type, props, ...childs) => {

  //省略确定flag的相关代码

  let childFlag = null;
  //1、是一个数组
  if (Array.isArray(childs)) {
    const { length } = childs;

    if (length === 0) {
      //没有子节点
      childFlag = ChildrenFlags.NO_CHILDREN
    }else if (length === 1) {
      //单个子节点
      childFlag = ChildrenFlags.SINGLE_VNODE;
      children = children[0];
    } else {
      //多个子节点,并且子节点都有key
      childFlag = ChildrenFlags.KEYED_VNODES;
      children = normalizeVNode(children);
    }
  } else if (childs._isVNode) {
    //是vnode
    childFlag = ChildrenFlags.SINGLE_VNODE;
  } else if (childs === null) {
    //没有子节点
    childFlag = ChildrenFlags.NO_CHILDREN;
  } else {
    //文本节点
    childFlag = ChildrenFlags.SINGLE_VNODE;
    children = createTextVNode(`${children}`);
  }

}
