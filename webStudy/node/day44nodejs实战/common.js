const superagent = require('superagent');
const path = require('path');
const fs = require('fs');

/**
 * 删除指定目录 
 */
const removeDir = (pathname) => {
  const fullPath = path.resolve(__dirname, pathname);
  const process = require('child_process');
  console.log(`${pathname}目录已存在，准备删除`);
  process.execSync(`rm -rf ${fullPath}`);
  console.log(`历史目录${pathname}已删除`);
};

/**
 * 创建指定目录
 */
 const mkImageDir = (pathname) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(__dirname, pathname);

    if (fs.existsSync(fullPath)) {
      //同步检测，当前目录是否存在
      // return reject(`${pathname} 目录已存在，跳过此步骤`);
      removeDir(pathname);
    }

    fs.mkdirSync(fullPath);
    return resolve(`创建目录${pathname}成功`);
  });
};

/**
 * 从字符串中提取key的value
 */
 const getValueListByReg = (str, key) => {
  let reg = new RegExp(`"${key}":"(.*?)"`, 'g');
  const matchResult = str.match(reg);

  const resList = matchResult.map((item) => {
    const res = item.match(/:"(.*?)"/g); //这里加括号，就可以通过RegExp.$1拿到括号中匹配到的内容
    return RegExp.$1;
  });

  return resList;
};

/**
 * 
 * @param {*} url 资源连接
 * @param {*} name 资源名称
 * @param {*} assetDir 资源存储的路径
 * @returns 
 */
const downloadAsset = (url, name, assetDir) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(__dirname, assetDir, name);

    if (fs.existsSync(fullPath)) {
      return reject(`文件已存在，跳过此步骤:${name}`);
    }

    superagent.get(url).end((err, res) => {
      if (err) {
        return reject(err);
      }

      fs.writeFile(fullPath, res.body, 'binary', (err) => {
        if (err) return reject(err);

        return resolve('下载成功');
      });
    });
  });
};

/**
 * 请求的url,header就是浏览器请求的header
 * @param {*} url 爬取的目标url
 * @param {*} headers 
 * @returns 
 */
const request = (url, headers) => {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .set(headers)
      .end(async (err, res) => {
        if (err) {
          reject(`访问失败 ${err}`);
        } else {
          resolve(res);
        }
      });
  });
};

// const module = {
//   exports: {}
// }
// exports 其实就是module.exports的简写，他们指向同一个地址
module.exports = {
  request,
  downloadAsset,
  getValueListByReg,
  mkImageDir,
  removeDir,
}