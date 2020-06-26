import Part from './Part.js';

class Engine extends Item {
  render() {
    return <Item>Hello, {this.props.name}</Item>;
  }
}

export default Engine;
