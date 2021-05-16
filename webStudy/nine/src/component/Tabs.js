import Component from './component';

export default class Tabs extends Component {
  render() {
    console.log(this.props.data)
    return `<div>新闻列表</div>`
  }
}