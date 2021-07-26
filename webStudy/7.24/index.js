//createElement
//jsx 是react不可预编译的时候做优化的原因
//虚拟dom就是一个对象结构
//<div class="div">fafd</div>
//{type: 'div', props:{class: 'div,  children: [{type: '', props: {nodeValue: 'fafd'}}]}, }

//jsx -- babel-plugin-jsx-transfer  500多行
//const Empty = <div></div>
//通过babel编译为 createElement

const isArr = Array.isArray;
const toArray = (arr) => (isArr(arr ?? []) ? arr : [arr]);
const isText = (txt) => typeof txt === 'string' || typeof txt === 'number';
const flatten = (arr) => [
  ...arr.map((ar) =>
    isArr(ar) ? [...flatten(ar)] : isText(ar) ? createTextWord(ar) : ar
  ),
];

//props.children 可以是一个对象或者多个对象；
//手写createElement
export function h(type, props, ...kids) {
  props = props ?? {};

  kids - flatten(toArray(props.children ?? kids)).filter(Boolean);
  if (kids.length) {
    props.children = kids.length === 1 ? kids[0] : kids;
  }

  const key = props.key ?? null;
  const ref = props.ref ?? null;

  delete props.key;
  delete props.ref;

  return createNode(type, props, key, ref);
}

function createTextWord(text) {
  return {
    type: '',
    props: {
      nodeValue: text + '',
    },
  };
}

function createNode(type, props, key, ref) {
  return { type, props, key, ref };
}

export function Fragment(props) {
  return props.children;
}


//scheduler 调度
// 管理任务，根据某种规则输出数据

//idle -- requestIdleCallback  黄金时间是16.77以内
// 16毫秒在执行一次，利用空闲时间的意思就是，有的任务只用几毫秒，就剩余十几毫秒空闲，这时候就可以被利用
//react没有使用浏览器的requestIdleCallback的调度的最总要原因是50毫秒优化的问题
//其余原因是兼容性不够

//postMessage ??
//event-loop中 宏任务在render前还是后执行 微任务在？  21： 20分

// react不用generator的原因？？？

// translation