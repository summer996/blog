//逻辑层

const onmessage = (e) => {
  console.log('i am webworker', e.data);
  postMessage(data);
}