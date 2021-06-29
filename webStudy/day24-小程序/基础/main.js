const worker = new Worker('./worker.js');

//事件通信？？？

//渲染层

worker.postMessage('i am main worker');

worker.onmessage = (e) => {
  console.log("main: ", "receive", e.data);
  // TrackEvent(e.data.type, e.data.opt);
}

