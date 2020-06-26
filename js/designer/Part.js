class Part extends React.Component {
  constructor(){
    this.cursor = {x:0, y:0};
  }

  handleMouseDown (e){
    e.preventDefault();//if on a device that fires both mouse and touch events, just fire the first (touch)
    e.stopPropagation();

    //get coords
    this.cursor.x = e.clientX || event.pageX || event.touches[0].pageX;
    this.cursor.y = e.clientY || event.pageY || event.touches[0].pageY;
  }

  render() {
    return <div onTouchStart={this.handleMouseDown} onMouseDown={this.handleMouseDown}>Hello!</div>;
  }
};

export default Item;
