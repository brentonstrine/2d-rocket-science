import Part from './Part.js';

class Person extends React.Component {
  render() {
    return <Item>Hello, {this.props.name}</Item>;
  }
}

export default Person;
