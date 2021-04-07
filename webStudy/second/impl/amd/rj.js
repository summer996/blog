const def = new Map();

const defaultOptions = {
  paths: ''
}


//form cdn
const __import = (url) => {
  return new Promise((resolve, reject) => {
    System.import(url).then(resolve, reject);
  })
};

//normal script
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
//dep --a --a.js  -> http:xxx/xx/xx/a.js
const __getUrl = (dep) => {
  const p = location.pathname;
  return p.slice(0, p.lastIndexOf('/')) + `/${dep}.js`;
}

rj = {};

rj.config = (options) => Object.assign(defaultOptions, options);


//定义模块， 触发的时机是在require的时候，
define = (name, deps, factory) => {
  //todo 参数之间的判断互换
  def.set(name, { name, deps, factory });
}

//其实才是触发依赖的地方
require = (deps, factory) => {
  return new Promise((resolve, reject) => {
    Promise.all(deps.map(dep => {
      //走cdn
      if (defaultOptions.paths[dep]) return __import(defaultOptions.paths[dep]);

      return __load(__getUrl(dep)).then(() => {
        const { deps, factory } = def.get(dep);
        if (deps.length === 0) {
          return factory(null);
        }
        return require(deps, factory);
      });
    })).then(resolve, reject);
  }).then(instances => factory(...instances));
}