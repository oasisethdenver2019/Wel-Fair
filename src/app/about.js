import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');
import { Button, notification, Layout, Menu, Breadcrumb, Input, List, Avatar, Card } from 'antd';
const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.min.css';
var Link = require('react-router').Link;

// const data = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant Design Title 2',
//   },
//   {
//     title: 'Ant Design Title 3',
//   },
//   {
//     title: 'Ant Design Title 4',
//   },
// ];

const contractAddress = '0x2dd89b83cce7a68d2a1f65aff95c398c62efb769';
const abi = require('../../Contract/abi');
const mycontract = web3.eth.contract(abi);
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

class About extends Component{
    render(){
      var checkStatus = setTimeout(function(){
        myContractInstance.getPlayerScore(web3.eth.accounts[0],function(err,result){
           var res = result;
          // alert(res);
           this.setState( {score:res.s});
        }.bind(this));
     }.bind(this),15000);
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
                <Menu.Item key="3">Admin</Menu.Item>
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
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={item.title}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
        data:[{}]
      }
    }
};



module.exports = About;
