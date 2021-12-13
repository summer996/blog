Array.prototype.map = function(fn, thisArg) {
    if(this === null) throw new TypeError("this is null or not defined");

    if(typeof fn !== "function") {
        throw new TypeError(`${fn} is not a function`);
    }

    let resArr;
    let len = this.length;
    if(len === 0) return [];

    for(let i = 0; i < len; i++) {
        this[i] !== undefined && (resArr[i] = fn.call(thisArg, this[i], i, this));
    }
    return resArr;
}