import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ products }) => ({
  data: products.newProduct,
}))
class Step3 extends React.PureComponent {

  render() {
    const { data } = this.props;
    const onFinish = () => {
      router.push('/products/new/info');
    };
    const seeAll = () => {
      router.push('/products/all');
    }

    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Name:
          </Col>
          <Col xs={24} sm={16}>
            {data.name}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Category:
          </Col>
          <Col xs={24} sm={16}>
            {data.categoryId}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Price Before Discount:
          </Col>
          <Col xs={24} sm={16}>
            {data.oldPrice}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Price:
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.newPrice}</span> 元
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Promote:
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.promote}</span> 元
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Description:
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.desc}</span> 元
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button onClick={seeAll}>See All Products</Button>
        <Button type="primary" onClick={onFinish}>
          Add another one
        </Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="Success"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step3;
