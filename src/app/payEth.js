var React = require('react');
var createReactClass = require('create-react-class');
require('./css/addItem.css');


var payEth = createReactClass({
  render: function(){
    return(
      <form id="add-topay" onSubmit={this.handleSubmit}>
          <input type="submit" value="Hit me to pay and play" />
      </form>
    );
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.pay();
  }
});
module.exports = payEth;
