// import { token, getToken } from './http';

import { getNewsList, getTabsApi } from './service'
import {NewsList, Tabs} from './component'

// AST课程讲解
//第一步，从服务端获取token
//后面所有的请求都需要带上这个token
// getTabs => 体育， 娱乐， 国内， 国际
// getNewsList 获取新闻列表 模拟并发请求


// getToken().then(res => {
//   console.log(res);
// })


class App {
  constructor() {
    this.init();
  }

  async init() {
    const [tabsData, newsListData] = await Promise.all([getTabsApi(), getNewsList()]);
    console.log(tabsData);
    console.log(newsListData);
    console.log(NewsList, Tabs)
  }

  getTabs() {

  }

  getNewsList() {

  }
}

new App();