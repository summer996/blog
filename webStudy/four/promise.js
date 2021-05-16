Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then(() => {
    console.log(44);
    
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then((res) => {
    console.log(2);
  })
  .then((res) => {
    console.log(3);
  })
  .then((res) => {
    console.log(5);
  })
  .then((res) => {
    console.log(6);
  })
  .then((res) => {
    console.log(7);
  })
  .then((res) => {
    console.log(8);
  });

/**
 * promise 返回的是Promise.resolve()时，事件的执行顺序
 *
 *
 * 1、执行这段代码，发现自己手动实现的promise和原生的promise,输出结果是不一致的
 * 2、参考网上的其他各种实现，发现也表现不一致，因此怀疑原生的promise和js模拟实现的Promise有着不可替代的区别
 * 3、查阅资料说，return Promise.resolve(4)   会产生两个微任务，如果真的是这样，那就可以解释的通这个输出结果
 * 4、产生两个微任务的合理解释为，当前栈执行为空的时候，才会resolve掉这个新的promise，才会把console.log(4)推到微任务队列
 *
 *
 * 微任务队列，宏任务队列，执行栈是三个不同的东西，
 * 当第一个微任务被推到执行栈时，执行的时候，就会创建上下文，顺序执行，
 * 查阅资料，当执行Promise.resolve时，会注册一个job,job类似微任务的概念，但是注册的时机是，当执行栈为空的时候，job会进队列，
 * job会有两个阶段，先执行this.resolvePromise（），并且这时候，执行栈依次按照任务队列执行，先执行this.resolvePromise()然后在把 console.log(res);放入队列
 */

/**
 * 当执行this.resolvePromise(promise2， 4， resolve，reject),当执行这个resolvePromise时，如果第二个参数，不是function，promise，object时，就会直接resolve，这个带来结果是什么，
 * 就是console.log(res)这个promise的状态被fulfilled，则console.log(res)就会被推进微任务队列
 *
 * 就js实现的promise,想要和原生的一样，可以hack的在
 * resolvePromise(promise2, x, resolve, reject) {
 *  if(x intanceof promise) {
 *
 *    queueMicrotask(() => {
 *      x.then((y) => {resolvePromise(promise2, y, resolve, reject)})
 *    })
 *  }
 * }添加一个微任务队列
 */

new Promise((resolve, reject) => {
  console.log(1);
  resolve();
})
  .then(() => {
    console.log(2);
    new Promise((resolve, reject) => {
      console.log(3);
      resolve();
    })
      .then(() => {
        console.log(4);
      })
      .then(() => {
        console.log(5);
      });
  })
  .then(() => {
    console.log(6);
  });

new Promise((resolve, reject) => {
  console.log(1);
  resolve();
})
  .then(() => {
    console.log(2);
    new Promise((resolve, reject) => {
      console.log(3);
      resolve();
    })
      .then(() => {
        console.log(4);
      })
      .then(() => {
        console.log(5);
      });
  })
  .then(() => {
    console.log(6);
    new Promise((resolve, reject) => {
      console.log(7);
      resolve();
    })
      .then(() => {
        console.log(8);
      })
      .then(() => {
        console.log(9);
      });
  });
//

new Promise((resolve, reject) => {
  console.log('2');
  resolve();
})
  .then(() => {
    console.log('21');
  })
  .then(() => {
    console.log('22');
  })
  .then(() => {
    console.log('23');
  })
  .then(() => {
    console.log('24');
  })

Promise.resolve()
  .then(() => {
    console.log(0);
  })
  .then(() => {
    console.log(44);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });
