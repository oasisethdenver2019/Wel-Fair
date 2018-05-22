import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');
import { Button, notification } from 'antd';
import 'antd/dist/antd.min.css';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const openNotification = () => {
  notification.open({
    message: 'Your score',
    description:  12,
  })
};

const seekeys = () => {
  notification.open({
    message: 'Your key',
    description:  '0xfndsajk',
  })
};


var Link = require('react-router').Link;

class About extends Component{
    render(){
        return(
            <div>
                <Link to={"/"}>Home</Link>
                <h2>All about me</h2>
                <Button type="primary" onClick={openNotification}>To see your score</Button>
                <p>keys</p>
                <Button type="second" onClick={seekeys}>To see your hash keys</Button>
            </div>
        );
    }
};

module.exports = About;
