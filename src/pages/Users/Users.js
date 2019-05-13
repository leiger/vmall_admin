import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Table, Card, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect()
class SearchList extends Component {

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  render() {
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="User ID or User Email"
          enterButton="Search"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );
    const dataSource = [{
      _id: '12345',
      email: 'fadf@faf.com',
      cartList: [],
      orderList: [],
      addressList: []
    }, {
      _id: '12345',
      email: 'fadf@faf.com',
      cartList: [],
      orderList: [],
      addressList: []
    }, {
      _id: '12345',
      email: 'fadf@faf.com',
      cartList: [],
      orderList: [],
      addressList: []
    }];

    const columns = [{
      title: 'USER ID',
      dataIndex: '_id'
    }, {
      title: 'EMAIL',
      dataIndex: 'email'
    }, {
      title: 'PRODUCTS IN CART',
      dataIndex: 'cartList',
      render: carts => <span>{carts.length}</span>,
    }, {
      title: 'ORDERS NUM',
      dataIndex: 'orderList',
      render: orders => <span>{orders.length}</span>,
    }, {
      title: 'ADDRESSES NUM',
      dataIndex: 'addressList',
      render: addresses => <span>{addresses.length}</span>,
    }, {
      title: 'ACTIONS',
      key: 'actions',
      render: () => (
        <span>
          <a href="javascript:;">Detail</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      )
    }];

    return (
      <PageHeaderWrapper
        title="Search User"
        content={mainSearch}
      >
        <Card bordered={false}>
          <Table dataSource={dataSource} columns={columns} />
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
