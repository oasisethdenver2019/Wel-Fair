var React = require('react');
var createReactClass = require('create-react-class');
require('./css/playItem.css');


var PlayItem = createReactClass({
  render: function(){
    return(
      <li>
        <div className= "play">
          <span className= "player1"> {this.props.item} </span>
          <span className= "remove"  onClick={this.handleDelete}> x  </span>
        </div>
      </li>
    );
  },

  handleDelete: function(){
    this.props.onDelete(this.props.item);
}

});

module.exports = PlayItem;
