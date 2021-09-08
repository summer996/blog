#!/usr/bin/env node
const inquirer = require('inquirer');
const { program } = require('commander');
// const inquirer = require('inquirer'); //图形操作，接收指令，配置问题，可以拿到用户输入的值
// const commander = require('commander'); //编辑指令 例如 node -v

const { runImg } = require('./image.handler');

// -V 自动被注册, node index.js -V即可查看版本号
program.version('0.0.1');

// -h 自动被注册, node index.js -h即可查看帮助, 查看所有命令
program
  .option('-v, --video', '爬取百度视频')
  .option('-i, --image', '爬取百度图片');

program.parse(process.argv);

const options = program.opts();

if (options.video) {
} else {
  //定义问题
  const initQuestions = [
    {
      type: 'input',
      name: 'keyword',
      message: '请输入想要搜索的关键词',
    },
    {
      type: 'number',
      name: 'counts',
      message: '请输入要下载的图片的数量x,最小30',
    },
    {
      type: 'input',
      name: 'assetDir',
      message: '请输入图片资源存储的文件夹名称',
      default: 'images',
    },
  ];

  inquirer.prompt(initQuestions).then((result) => {
    const { keyword, assetDir, counts } = result;
    // 添加一个参数 assetDir, 通过命令行控制存储位置
    runImg(keyword, counts * 30, assetDir);
  });
}
