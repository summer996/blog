const cacheMap = new Map();
//装饰器，前端埋点，独立与业务
export function EnableCache(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  const oldValue = descriptor.value;

  descriptor.value = async function (...args: any) {
    const cacheKey = name + JSON.stringify(args);

    if (!cacheMap.get(cacheKey)) {
      const cacheValue = Promise.resolve(oldValue.apply(this, args)).catch(
        () => {
          cacheMap.set(cacheKey, null);
        }
      );

      cacheMap.set(cacheKey, cacheValue);
    }
  };

  return descriptor;
}



