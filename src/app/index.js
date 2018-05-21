// React
import React, {Component} from 'react';
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import { Router, Route, browserHistory, Link} from 'react-router';

// module require
var PlayItem = require('./playItem');
var AddItem = require('./addItem');
var About = require('./about');
require('./css/index.css');

// Smart Contract
const contractAddress = '0xa92f0e97629f5d31e85ac2c5f087b86bff8b43d3';
const abi = require('../../Contract/abi');
const mycontract = new web3.eth.contract(abi);
const myContractInstance = mycontract.at(contractAddress);


// metaMask listener
window.addEventListener('load', function() {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
           if (typeof web3 !== 'undefined') {
                // Use Mist/MetaMask's provider
                window.web3 = new Web3(web3.currentProvider);
            } else {
                console.log('No web3? You should consider trying MetaMask!')
                // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
                window.web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:8545"));
        }
      });

// Routing
class App extends Component{
  render() {
    return(
      <Router history={browserHistory}>
        <Route path={"/"} component={GameComponent}></Route>
        <Route path={"/about"} component={About}></Route>
      </Router>
    );
  }
};


// Create component, initialization
class GameComponent extends Component{
  render(){
    var todos = this.state.todos;
    todos = todos.map(function(item,index){
      return(
        <PlayItem key={index} item={item} onDelete = {this.onDelete}/>
      );
    }.bind(this));

     var checkTX = setTimeout(function(){
       web3.eth.getTransactionReceipt(this.state.txHash, function(err, receipt){
        if(!err){
          if(receipt == null){
            this.setState( {age:'new transaction in process'});
          }
          else{
          this.setState( {age:'transaction: ' + this.state.txHash + ' is minded'});
          console.log(JSON.stringify(receipt));
          }
        }
        else{

          this.setState( {age:'no transaction'});
        }

      }.bind(this));

    }.bind(this),15000);

    return(
      <div id= 'list'>
        <Link to={"/about"}>Score Board</Link>
        <p> Ready Player one</p>
        <p>{this.state.age}</p>
        <ul>{todos}</ul>
        <AddItem onAdd={this.onAdd} />
        </div>
    );

  }

  constructor(props){
    super(props);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      todos:['one','two','three'],
      age:'no transaction',
      txHash: ''
    }

  }


  async onAdd(item){
    var list = this.state.todos;
    list.push(item);
    var getData = myContractInstance.add.getData(1, "0xcdabc");
    await web3.eth.sendTransaction({from: web3.eth.accounts[0], to: contractAddress, data:getData},(err, res) =>{
      this.setState({txHash:res, age:'new transaction sent'});
      console.log(res);
    });
      this.setState({
      todos:list
    })
  }


  onDelete(item){

          console.log(web3.eth.accounts[0]);
          var updatedTodos = this.state.todos.filter(function(val, index){
              return item !== val;
          });
          this.setState({
            todos: updatedTodos
          });
      }
};

export default App;
