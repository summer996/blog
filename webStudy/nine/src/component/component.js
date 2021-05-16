export default class Component {
  constructor(data) {
    this.props = {
      data
    }
  }

  constructElement() {
    const html = this.render();

    const $container = document.createElement('div');

    $container.innerHTML = html;

    this.$el = $container.firstChild;
  }

  mount() {
    if (!this.$el) {
      this.constructElement();
    }

    $container.appendChild(this.$el);
  }

  render() {
    return null;
  }
}