// React
import React, {Component} from 'react';
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

// Smart Contract
const contractAddress = '0x3e6eba20c93cbc2ba817b2cfa520044eea345e6e';
const abi = require('../../Contract/abi');
const mycontract = web3.eth.contract(abi);
const myContractInstance = mycontract.at(contractAddress);

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


class AdvancedSearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    txStatus:'no transaction',
    txHash: ''
  }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


   handleSearch(e){
    e.preventDefault()
    this.props.form.validateFields({ force: false },(err, values) => {
      if (err){
        console.log(err)}
      else{
        //console.log(web3.toHex(answer));
        var getData = myContractInstance.SubmitBounty.getData(web3.toHex(values[Object.keys(values)[0]]),
                                                         web3.toHex(values[Object.keys(values)[1]]),
                                                         Number(values[Object.keys(values)[2]]));
        console.log(web3.toHex(values[Object.keys(values)[0]]),
        web3.toHex(values[Object.keys(values)[1]]),
        Number(values[Object.keys(values)[2]]));

         web3.eth.sendTransaction({from: web3.eth.accounts[0], to: contractAddress, data:getData, value: '20000000000000000'},(err, res) =>{
          this.setState({txHash:res, txStatus:'new transaction sent'});
          console.log(res);
        }).bind(this);
    }
  });
}

async componentWillMount() {
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
 }.bind(this))}


  handleReset(){
    this.props.form.resetFields();
  }


  // To generate mock Form.Item
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const children = [];
    const words = ['Describtion of Task','Location','Price to Incentive'];
    for (let i = 0; i < 3; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: 'block'}}>
          <FormItem label={words[i]}>
            {getFieldDecorator(`field-${i}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="Goof will" />
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }}>
            {this.state.txStatus}
            </a>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
module.exports = Form.create()(AdvancedSearchForm)
