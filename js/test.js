//深度比较
function isEqual(data1, data2) {

}

//版本号比较
function compareVersion(version1, version2) {

}

//千分位
function thousands(num) {
    //还需要判断是否为数字
    if(Object.prototype.toString.call(num) !== '[object Number]') {
        return new Error('请输入数字')
    }
    const [firstStr, floatStr] = num.toString().split('.');
    const arr = firstStr.split('');
    const restNum = arr.length % 3;
    let strArr = restNum > 0 ? [arr.splice(0, restNum).join('')] : [];
    while(arr.length > 0) {
        let str = arr.splice(0, 3).join('');
        strArr.push(str);
    }
    let joinStr = strArr.join(',');
    return floatStr ? joinStr + '.' + floatStr : joinStr;
}

//函数颗粒化
function add() {
    //获取第一次传入的参数
    const args = [...arguments];
    return function cb(){
        const _args = [...arguments];
        if(_args.length === 0) {
            return args.reduce((pre, current) => pre += current);
        } else {
            args.push(..._args);
            return cb;
        }
    }
}

//实现instanceof
function myInstanceof(instance, classType) {
    if(typeof instance !== 'object') return false;
    while(instance !== null) {
        if(instance.__proto__ === classType.prototype) {
            return true;
        };
        instance = instance.__proto__;
    } 
    return false;
}

//数组中找目标值
function targetValue (nums, target) {
    const numMap = {};
    let result = [];
    nums.forEach(item => {
        let jian = target - item;
        if(numMap[jian]) {
            result.push([jian, item]);
            delete numMap[jian];
        } else {
            numMap[item] = item;
        }
    })
    return result;
}

//括号匹配
function isValidString(s) {
    if(s.length % 2 === 1) return false;

    const strArr = [];
    for(let i = 0; i < s.length; i++) {
        let item = s[i];
        if(item === '(') {
            strArr.push(item);
        } else {
            strArr.pop();
        }
    }
    return strArr.length === 0;

}

//找出出现最多的字符串
function findAllCharts(str) {
    let strArr = [];
    let temp = [str[0]];
    for(let i = 1; i < str.length; i++) {
        let item = str[i];
        if(item === temp[0]) {
            temp.push(item);
        } else {
            let strs = temp.join('');
            strArr.push(strs);
            temp.length = 0;
            temp.push(item);
        }
    }

    const strObj = {};
    strArr.forEach(item => {
        let key = item.length;
        let value = item[0];
        let preValue = strObj[key]
        if(preValue) {
            strObj[key] = preValue + value;
        } else {
            strObj[key] = value;
        }
    })
    
    let keys = Object.keys(strObj);
    let lens = keys.length;
    let maxValue = strObj[keys[lens - 1]];
    let maxStrArr = maxValue.split('');

    let strs = {};
    maxStrArr.forEach(item => {
        strs[item] = keys[lens - 1];
    })

    return strs;
}