// React
import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

// Design
import { Search,Button, notification, Layout, Menu, Breadcrumb, Input, List, Avatar, Card,InputNumber} from 'antd';
const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.min.css';
var Link = require('react-router').Link;
const _ = require('lodash');
var Payeth = require('./payEth');


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
    var counter = 0;
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
        counter += 1;
        if (paramValue.c[0] == 0){item[paramName] = "open"+ counter.toString();}
        if (paramValue.c[0] == 1){item[paramName] = "in progress"+ counter.toString();}
        if (paramValue.c[0] == 2){item[paramName] = "closed"+ counter.toString();}
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
                    <Button type="primary" onClick={this.getsecondQuestion}>{"the status is " + item.status  }</Button>

                    
                  </List.Item>
                )}
              />
              </div>
              {/* <Search placeholder="input the bounty" enterButton="Submit" size="large" onSearch={value => this.getsecondQuestion(value)}/> */}

              {/* <InputNumber min={1} max={10} defaultValue={3} onChange={this.getsecondQuestion} />, */}

            </Content>
              <p>   Input number to commit your responsibility: </p>
            <Footer style={{ textAlign: 'center' }}>
              Well Fare for our city
            </Footer>
        </Layout>

        );
    }

    constructor(props){
      super(props);
      this.getfirstQuestion = this.getfirstQuestion.bind(this);

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

     await myContractInstance.getAllbounty(function(err,result){
     var res = result;
     var answerInJson = parseJson(res);
     var data = answerInJson;
     this.setState( {data});
  }.bind(this));

  }

  async getfirstQuestion(value){
      console.log("clicked");
  }


};



module.exports = About;
