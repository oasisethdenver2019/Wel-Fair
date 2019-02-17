// React
import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

// Design
import { Button, notification, Layout, Menu, Breadcrumb, Input, List, Avatar, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox,AutoComplete } from 'antd';
const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.min.css';
var Link = require('react-router').Link;
const _ = require('lodash');

const contractAddress = '0x3e6eba20c93cbc2ba817b2cfa520044eea345e6e';
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
                <Menu.Item key="1"><Link to={"/about"}>Task Status</Link></Menu.Item>
                <Menu.Item key="2"><Link to={"/"}>Dash Board</Link></Menu.Item>
                <Menu.Item key="3">Submit Task</Menu.Item>
                <Menu.Item key="4"><Link to={"/ipfs"}>Validate</Link></Menu.Item>
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
                <p>the admin's address is :{this.state.admin}</p>
                <br />
                <p>You can submit your Task request here</p>
              </div>
              <br />
              <RegistrationForm/>
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
  }
};



module.exports = Admin;
