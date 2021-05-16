export function measure(target: any, name: any, descriptor: any) {
  const oldValue = descriptor.value;

  descriptor.value = async function () {
    const start = Date.now();
    const res = await oldValue.apply(this, arguments);
    console.log(`耗时：${start - Date.now()}`)
    return res;
  }
}