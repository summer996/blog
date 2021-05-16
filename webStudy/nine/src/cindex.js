import regeneratorRuntime from "regenerator-runtime";
import {getTabs, getNewsList} from './http'
import {NewsList, Tab} from './component/index'
import {throttle, decoratorThrottle} from './util'
// console.log(utils.request)
// console.log('token', token)

// setTimeout(() => {
//   console.log('token', token)
// }, 2000)


class App {
  constructor({root}) {
    this.root = root;
    this.init()

    // this.appendList = throttle.call(this, this.appendList, 500)
  }
  init() {
    this.listenScroll()
    this.requestData()
  }

  async requestData() {
    // const [tabs, newsList] = await Promise.all([getTabs(), getNewsList()])
    const tabsTask = getTabs()
    const newsTask = getNewsList()

    const tabs = await tabsTask
    const newsList = await newsTask

    console.log(tabs, newsList)

    new Tab(tabs).mount(this.root)
    new NewsList(newsList).mount(this.root)

    getNewsList();getNewsList();getNewsList();
  }

  listenScroll() {
    const DISTANCE = 100
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY
      const screenHeight = window.screen.height
      const domHeight = document.documentElement.offsetHeight

      if(domHeight - (scrollY + screenHeight) < DISTANCE) {
        this.appendList(4,7,8)
      }
    })
  }

  @decoratorThrottle(500)
  async appendList() {
    console.log('appendlist')
    const newsList = await getNewsList()
    new NewsList(newsList).mount(this.root)
  }
}

new App({root: document.body})