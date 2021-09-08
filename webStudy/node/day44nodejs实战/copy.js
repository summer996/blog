#!/usr/bin/env node
const inquirer = require('inquirer');
const commander = require('commander');
// const inquirer = require('inquirer'); //图形操作，接收指令，配置问题，可以拿到用户输入的值
// const commander = require('commander'); //编辑指令 例如 node -v

const { runImg } = require('./image.handler');

//定义问题
const initQuestions = [
  {
    type: 'checkbox',
    name: 'channels',
    message: '请选择想要搜索的渠道',
    choices: [
      {
        name: '百度图片',
        value: 'images',
      },
      {
        name: '百度视频',
        value: 'video',
      },
    ],
  },
  {
    type: 'input',
    name: 'keyword',
    message: '请输入想要搜索的关键词',
  },
  {
    type: 'number',
    name: 'counts',
    message: '请输入要下载的图片的数量x,最小30'
  }
];

inquirer.prompt(initQuestions).then((result) => {
  const { keyword, channels, counts } = result;
  console.log(channels); //为什么为空？
  for (let channel of channels) {
    switch (channel) {
      case 'images': {
        console.log(111);
        runImg(keyword, counts);
        break;
      }
    }
  }
});
