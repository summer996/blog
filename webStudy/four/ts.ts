// 枚举
/**
 * 如果不设置值，默认从0开始
 * 如果设置了一个值，下一个值没有设置，默认累加一个,需要注意，当类型为string后，在这个值以下定义的都需要默认值
 */
enum Test {
  A = 5,
  B,
  C = 'fasdf'
}

const type = Test.A;
const b = Test.B;

/**
 * type
 * interface
 */

type AjaxMethod = 'get' | 'post';

interface Tests {
  name: string;
  age: number;
}

const a: Tests = {
  name: 'fasf',
  age: 33
}
/**
 * 
 * @param x typeof  获取类型
 * @returns 
 */
// function toArray(x: number): number[] {
//   return [x];
// }

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray;


interface Person {
  name: string;
  age: number;
}

type k1 = keyof Person;
const as: k1 = 'name';

type keys = 'a' | 'v' | 'c';
type Obj = {
  [p in keys]: any;
}

const aa: Obj = {
  a: 2,
  v: 3,
  c: 222
}

type aaa = [string, number];
const ass: aaa = ['fasf', 111];