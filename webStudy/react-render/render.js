import { mount } from './mount';
import { patch } from './patch';

/**
 * step3 渲染f(vnode, parent)
 */

export const render = (vnode, parent) => {
  let prev = parent._vnode;

  if (!prev) {
    mount(vnode, parent);
    parent._vnode = vnode;
  } else {
    if (vnode) {
      patch(prev, vnode, parent);
      parent._vnode = vnode; 
    } else {
      parent.removeChild(prev.$$.el);
    }
  }
}