
// for (let i = 0; i < 1000; i++) {
//   debugger;
//   console.log('12312');
// }

let cache = {
  method: function () {
    console.log('this is cache');
  }
}

function cacheInfo(info) {
  const prevCache = cache;
  const method = function () {
    prevCache && prevCache.method();
  }

  cache = {
    info,
    method() {
      method();
      console.log('this is method')
    }
  }
}
for (let i = 0; i < 100000; i++) {
  const info = new Array(100000);
  cacheInfo(info);
}