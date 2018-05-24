import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');
import { Button, notification, Layout, Menu, Breadcrumb, Input, List, Avatar, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox,AutoComplete } from 'antd';
const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.min.css';
var Link = require('react-router').Link;
const _ = require('lodash');

const contractAddress = '0x9b560a881bcbc6c9aa7c2f113a4877cbc695a829';
const abi = require('../../Contract/abi');
const mycontract = web3.eth.contract(abi);
const myContractInstance = mycontract.at(contractAddress);
var RegistrationForm = require('./form.js');

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

class Admin extends Component{
    render(){
        return(

          <Layout className="layout">
           <Header>
            <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['3']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1"><Link to={"/about"}>Score Board</Link></Menu.Item>
                <Menu.Item key="2"><Link to={"/"}>Main Game</Link></Menu.Item>
                <Menu.Item key="3">Admin</Menu.Item>
              </Menu>
          </Header>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <br />
              <br />
              <div>
                <Avatar shape="square" size="large" icon="user" />
                <p>the admin at current round is :{this.state.admin}</p>
                <br />
                <p>if that is your address, that means you can kill, or refresh the game! Below is only for Admin</p>
              </div>
              <br />
              <RegistrationForm/>
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
        admin:'',
      }
    }

  async componentWillMount() {
       await myContractInstance.admin(function(err,result){
       var res = result;
       console.log(res);
       var admin = res;
       this.setState( {admin});
    }.bind(this));

      await myContractInstance.getKey(web3.eth.accounts[0],function(err,result){
      var res = result;
      //alert(res);
      var key1 = web3.toAscii(res[0]);
      var key2 = web3.toAscii(res[1]);
      this.setState( {key1, key2});
    }.bind(this));
  }
};



module.exports = Admin;
