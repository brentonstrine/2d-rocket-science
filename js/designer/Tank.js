import Part from './Part.js';

class Tank extends Item {
  render() {
    return <Item>Hello, {this.props.name}</Item>;
  }
};

export default Tank;
