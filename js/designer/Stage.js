import Part from './Part.js';

class Stage extends Item {
  render() {
    return <Item>Hello, {this.props.name}</Item>;
  }
};

export default Stage;
