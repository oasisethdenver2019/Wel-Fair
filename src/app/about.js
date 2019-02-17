// React
import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

// Design
import { Button, notification, Layout, Menu, Breadcrumb, Input, List, Avatar, Card } from 'antd';
const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.min.css';
var Link = require('react-router').Link;
const _ = require('lodash');

// SmatContract
const contractAddress = '0x3e6eba20c93cbc2ba817b2cfa520044eea345e6e';
const abi = require('../../Contract/abi');
const mycontract = web3.eth.contract(abi);
const myContractInstance = mycontract.at(contractAddress);

// Dataparsing
function parseJson(Resp){
  console.log(Resp);
  const results = [];
  var parameters = ['task','location','incent','owner','status'];//web3.toAscii(res)
  Object.keys(Resp).forEach((paramValues, paramIndex) => {
    const paramName = parameters[paramIndex];
    Resp[paramValues].forEach((paramValue, itemIndex) =>{
      const item = _.merge({}, _.get(results, [itemIndex], {}));
      if (paramIndex == 0){
        item[paramName] = paramValue;
      }
      else if(paramIndex == 1){
        item[paramName] = paramValue;
      }

      else if(paramIndex == 2){
        item[paramName] = paramValue.c[0];
      }

      else if(paramIndex == 3){
        item[paramName] = paramValue;
      }

      else if(paramIndex == 4){
        if (paramValue.c[0] == 0){item[paramName] = "open";}
        if (paramValue.c[0] == 1){item[paramName] = "in progress";}
        if (paramValue.c[0] == 2){item[paramName] = "closed";}
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
                <Menu.Item key="1">Task Status</Menu.Item>
                <Menu.Item key="2"><Link to={"/"}>Dash Board</Link></Menu.Item>
                <Menu.Item key="3"><Link to={"/admin"}>Submit Task</Link></Menu.Item>
                <Menu.Item key="4"><Link to={"/ipfs"}>Validate</Link></Menu.Item>

              </Menu>
          </Header>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {/* <Card title="Your game record" style={{ width: 300 }}>
                <p>Your score is: {this.state.score}</p>
                <p>Your first key is: {this.state.key1}</p>
                <p>Your second key is: {this.state.key2}</p>
                <p>Your account is: {this.state.account}</p>
              </Card> */}
              <br />
              <br />
        <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://i.pinimg.com/236x/59/cb/10/59cb10c177662eaf625b2cb80da3d4dd.jpg" />}
                      title={<a href={"https://rinkeby.etherscan.io/address/"+item.address}>{"Location of the bounty is "+ web3.toAscii(item.location) + " The Bounty task is: " + web3.toAscii(item.task) }</a>}
                      description={ " The Bounty responser is "+ item.owner }
                    />
                    {"the status is " + item.status }
                    
                  </List.Item>
                )}
              />
              </div>
            </Content>
              <p>   rules: </p>
            <Footer style={{ textAlign: 'center' }}>
              Well Fare for our city
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
    //    await myContractInstance.getPlayerScore(web3.eth.accounts[0],function(err,result){
    //    var res = result;
    //    var score = res.c[0];
    //    this.setState( {score});
    // }.bind(this));

  //     await myContractInstance.getKey(web3.eth.accounts[0],function(err,result){
  //     var res = result;
  //     var key1 = web3.toAscii(res[0]);
  //     var key2 = web3.toAscii(res[1]);
  //     this.setState( {key1, key2});
  //  }.bind(this));

     await myContractInstance.getAllbounty(function(err,result){
     var res = result;
     var answerInJson = parseJson(res);
     var data = answerInJson;
     this.setState( {data});
  }.bind(this));

  }
};



module.exports = About;
