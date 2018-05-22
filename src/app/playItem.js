import { Input } from 'antd';
const Search = Input.Search;
var React = require('react');
var createReactClass = require('create-react-class');
require('./css/playItem.css');
import 'antd/dist/antd.min.css';


var Playform = createReactClass({
  render: function(){
    return(
        <div>
          <br />
          <Search placeholder="input answer1" enterButton="Submit answer for first question" size="large" onSearch={this.handleSubmit(this.value)}/>
          <br />
          <br />
          <Search placeholder="input answer2" enterButton="Submit answer for second question" size="large" onSearch={value => console.log(value)}/>
        </div>
      // <li>
      //   <div className= "play">
      //     <span className= "player1"> {this.props.item} </span>
      //     <span className= "remove"  onClick={this.handleDelete}> x  </span>
      //   </div>
      // </li>
    );
  },

  handleSubmit: function(item){
    this.props.onSubmit(item);
}

});

module.exports = Playform;
