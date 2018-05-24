import React, {Component} from 'react';
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleSearch(e){
    e.preventDefault()
    this.props.form.validateFields({ force: false },(err, values) => {
      if (err){
        console.log(err)}
      else{
      console.log('Received values of form: ', JSON.stringify(values));}
      alert(values);
    });
  }

  handleReset(){
    this.props.form.resetFields();
  }


  // To generate mock Form.Item
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const children = [];
    const words = ['question1','question2','answer1','answer2','final answer','key1','key2']
  //   children.push(
  //   <Col span={8} key={1} style={{ display:'block'}}>
  //   <FormItem label={'question1'}>
  //   {getFieldDecorator(`field-${1}`, {
  //     rules: [{
  //       required: true,
  //       message: 'Input something!',
  //     }],
  //   })(
  //     <Input placeholder="placeholder" />
  //   )}
  //   </FormItem>
  //   </Col>
  //   )
  //   children.push(
  //   <Col span={8} key={2} style={{ display:'block'}}>
  //   <FormItem label={'question2'}>
  //   {getFieldDecorator(`field-${2}`, {
  //     rules: [{
  //       required: true,
  //       message: 'Input something!',
  //     }],
  //   })(
  //     <Input placeholder="placeholder" />
  //   )}
  //   </FormItem>
  //   </Col>
  // )
    for (let i = 0; i < 7; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: 'block'}}>
          <FormItem label={words[i]}>
            {getFieldDecorator(`field-${i}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="placeholder" />
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
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
module.exports = Form.create()(AdvancedSearchForm)
