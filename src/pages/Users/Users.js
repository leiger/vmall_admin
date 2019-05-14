import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Table, Card, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ user }) => ({
  user
}))
class SearchList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
      // payload: {
      //   count: 5,
      // },
    });
  }

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
    const { user } = this.props;
    const dataSource = user.list

    const columns = [{
      title: 'USER ID',
      dataIndex: '_id'
    }, {
      title: 'EMAIL/USERNAME',
      dataIndex: 'email'
    }, {
      title: 'PRODUCTS IN CART',
      dataIndex: 'cartList',
      render: cartList => <span>{cartList ? cartList.length : 'empty'}</span>,
    }, {
      title: 'ORDERS NUM',
      dataIndex: 'orderList',
      render: orderList => <span>{orderList ? orderList.length : 'empty'}</span>,
    }, {
      title: 'ADDRESSES NUM',
      dataIndex: 'addressList',
      render: addressList => <span>{addressList ? addressList.length : 'empty'}</span>,
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
