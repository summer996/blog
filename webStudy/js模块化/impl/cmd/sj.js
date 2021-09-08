const modules = {};

const toUrl = (dep) => {
  const p = location.pathname;
  return p.slice(0, p.lastIndexOf('/')) + `/${dep}.js`;
}

const getDepsFormfn = (fn) => {
  let matches = [];

  let reg = /(?:require\()(?:['"])([^'"]+)\)/g;
  let r = null;
  while ((r = reg.exec(fn.toString())) !== null) {
    reg.lastIndex;
    mathches.push(r[1]);
  }

  return matches;
}

define = (id, factory) => {
  const url = toUrl(id);

  const deps = getDepsFormfn(factory);
  if (!modules[id]) {
    modules[id] = { url, id, factory };
  }
}

const __load = (url) => {
  return new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0];
    const node = document.createElement('script');
    node.type = "text/javascript";
    node.src = url;
    node.async = true;
    node.onload = resolve;
    node.onerror = reject;
    head.appendChild(node);
  })
};

const sj = {};
sj.use = (modules, callback) => {
  modules = Array.isArray(modules) ? modules : [module]
  return new Promise((resolve, reject) => {
    Promise.all(modules.map(module => {

    })).then(resolve, reject)
  }).then(instances => callback && callback(...instances));
}