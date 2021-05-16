class BaseRouter {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
    this.refresh = this.refresh.bind(this);
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }
  route(path, callback) {
    this.routes[path] = callback || function () {};
  }
  refresh() {
    this.currentUrl = `/${location.hash.slice(1) || ''}`;
    this.routes[this.currentUrl]();
  }
}
const content = document.querySelector('body');
function changeBgColor(color) {
  content.style.backgroundColor = color;
}
const Router = new BaseRouter();
Router.route('/', function () {
  changeBgColor('white');
});
Router.route('/green', function () {
  changeBgColor('green');
});
Router.route('/gray', function () {
  changeBgColor('gray');
});
