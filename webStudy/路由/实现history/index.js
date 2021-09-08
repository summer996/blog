class BaseRouter {
  constructor() {
    this.routes = {};
    this.init(location.pathname);
    window.addEventListener("popstate", (e) => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }

  init(path) {
    window.history.replaceState({ path: path, }, null, path);
    this.routes[path] && this.routes[path]();
  }
  
  route(path, callback) {
    this.routes[path] = callback || function () { };
  }
  
  go(path) {
    window.history.pushState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }
}

const Router = new BaseRouter();

const body = document.querySelector("body");

const container = document.querySelector(".container");

function changeBgColor(color) {
  body.style.backgroundColor = color;
}
// 注册路由
Router.route("/", function () {
  changeBgColor("white");
});

Router.route("/gray", function () {
  changeBgColor("gray");
});

Router.route("/green", function () {
  changeBgColor("green");
});

container.addEventListener("click", (e) => {
  //阻止a标签的默认事件,并且刷新页面
  if (e.target.tagName === "A") {
    if (e.target.tagName === "A") {
      e.preventDefault();
      Router.go(e.target.getAttribute("href"));
    }
  }
});