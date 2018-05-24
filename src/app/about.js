import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');
import { Button, notification, Layout, Menu, Breadcrumb, Input, List, Avatar, Card } from 'antd';
const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.min.css';
var Link = require('react-router').Link;
const _ = require('lodash');


const contractAddress = '0xdb343f9a9260e28bb11ae2ee10192ba1ff1a26ce';
const abi = require('../../Contract/abi');
const mycontract = web3.eth.contract(abi);
const myContractInstance = mycontract.at(contractAddress);


function parseJson(Resp){
  const results = [];
  var parameters = ['address','points'];
  Object.keys(Resp).forEach((paramValues, paramIndex) => {
    const paramName = parameters[paramIndex];
    Resp[paramValues].forEach((paramValue, itemIndex) =>{
      const item = _.merge({}, _.get(results, [itemIndex], {}));
      if (paramIndex == 0){
        item[paramName] = paramValue;
      }
      else if(paramIndex == 1){
        item[paramName] = paramValue.c[0];
      }
      results[itemIndex] = item;
    })
  })
  return results;
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

class About extends Component{
    render(){
     //  var checkStatus = setTimeout(function(){
     //    myContractInstance.getPlayerScore(web3.eth.accounts[0],function(err,result){
     //       var res = result;
     //       //alert(res);
     //       //console.log(res);
     //
     //       this.setState( {score: res.c[0]});
     //    }.bind(this));
     // }.bind(this),15000);

        return(

          <Layout className="layout">
           <Header>
            <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">Score Board</Menu.Item>
                <Menu.Item key="2"><Link to={"/"}>Main Game</Link></Menu.Item>
                <Menu.Item key="3"><Link to={"/admin"}>Admin</Link></Menu.Item>
              </Menu>
          </Header>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Card title="Your game record" style={{ width: 300 }}>
                <p>Your score is: {this.state.score}</p>
                <p>Your first key is: {this.state.key1}</p>
                <p>Your second key is: {this.state.key2}</p>
                <p>Your account is: {this.state.account}</p>
              </Card>
              <br />
              <br />
        <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://i.pinimg.com/236x/59/cb/10/59cb10c177662eaf625b2cb80da3d4dd.jpg" />}
                      title={<a href={"https://rinkeby.etherscan.io/address/"+item.address}>{item.address}</a>}
                      description={"this player has points of " + item.points}
                    />
                  </List.Item>
                )}
              />
              </div>
            </Content>
              <p>   rules: </p>
            <Footer style={{ textAlign: 'center' }}>
              Ready Player One -- Oasis
            </Footer>
        </Layout>

        );
    }

    constructor(props){
      super(props);
      this.state = {
        score:0,
        account: web3.eth.accounts[0],
        key1: '',
        key2:'',
        scoreboard:[],
        scores:[],
        data:[]
      }
    }

  async componentWillMount() {
       await myContractInstance.getPlayerScore(web3.eth.accounts[0],function(err,result){
       var res = result;
       //alert(res);
       var score = res.c[0];
       this.setState( {score});
    }.bind(this));

      await myContractInstance.getKey(web3.eth.accounts[0],function(err,result){
      var res = result;
      //alert(res);
      var key1 = web3.toAscii(res[0]);
      var key2 = web3.toAscii(res[1]);
      this.setState( {key1, key2});
   }.bind(this));

     await myContractInstance.getAllscore(function(err,result){
     var res = result;
     //alert(res);
     var answerInJson = parseJson(res);
     // var key1 = web3.toAscii(res[0]);
     // var key2 = web3.toAscii(res[1]);
     var data = answerInJson;
     this.setState( {data});
  }.bind(this));

  }
};



module.exports = About;
