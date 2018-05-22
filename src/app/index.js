// React
import React, {Component} from 'react';
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import { Router, Route, browserHistory, Link} from 'react-router';
//design 
import { Layout,  Button, notification, Menu, Breadcrumb} from 'antd';
const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.min.css';

// module require
var PlayItem = require('./playItem');
var AddItem = require('./addItem');
var About = require('./about');
require('./css/index.css');

// Smart Contract
const contractAddress = '0x2dd89b83cce7a68d2a1f65aff95c398c62efb769';
const abi = require('../../Contract/abi');
const mycontract = web3.eth.contract(abi);
const myContractInstance = mycontract.at(contractAddress);

// notificaiton

const openNotification = () => {
  notification.open({
    message: 'Your score',
    description:  12,
  })
}

const seekeys = () => {
  
  notification.open({
    message: 'Your key',
    description:  '0xfndsajk',
  })
}

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
     var checkTX = setTimeout(function(){
       web3.eth.getTransactionReceipt(this.state.txHash, function(err, receipt){
        if(!err){
          if(receipt == null){
            this.setState( {txStatus:'new transaction in process'});
          }
          else{
          this.setState( {txStatus:'transaction: ' + this.state.txHash + ' is minded'});
          console.log(JSON.stringify(receipt));
          }
        }
        else{
          this.setState( {txStatus:'no transaction'});
        }
      }.bind(this));
    }.bind(this),15000);

    return(
      
          <Layout className="layout">
           <Header> 
            <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              > 
                <Menu.Item key="1"><Link to={"/about"}>Score Board</Link></Menu.Item>
                <Menu.Item key="2">Main Game</Menu.Item>
                <Menu.Item key="3">Admin</Menu.Item>
              </Menu>
          </Header>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{this.state.txStatus}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <AddItem pay={this.pay} />
              <p>div</p>
              <Button type="primary" onClick={this.getfirstQuestion}>To see your score</Button>
              <p>keys</p>
              <Button type="second" onClick={seekeys}>To see your hash keys</Button>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ready Player One -- Oasis
            </Footer>
        </Layout>

    ); 
  }

  constructor(props){
    super(props);
    this.pay = this.pay.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.getfirstQuestion = this.getfirstQuestion.bind(this);
    this.state = {
      txStatus:'no transaction',
      txHash: ''
    }
  }


  async pay(){
    var getData = myContractInstance.payforQuestion.getData();
    await web3.eth.sendTransaction({from: web3.eth.accounts[0], to: contractAddress, data:getData, value:"20000000000000000"},(err, res) =>{
      this.setState({txHash:res, txStatus:'new transaction sent'});
      console.log(res);
    });
      // alert
  }
  
  
  async getfirstQuestion(){
      console.log(myContractInstance);
       myContractInstance.getPlayerScore(web3.eth.accounts[0],function(err,result){
         alert(result);
         var res = result;
         console.log(res);
         notification.open({
           message: 'Your question',
           description:  "result",
         });
      })

    }
      // alert
  
  


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
