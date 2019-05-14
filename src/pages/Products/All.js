import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';
import router from 'umi/router';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import defaultImg from '../../assets/products/react.png'

import styles from './All.less';

@connect(({ products, loading }) => ({
  products,
  loading: loading.models.list,
}))
class CardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/fetch',
      payload: {
        count: 8,
      },
    });
  }

  getImgAddress = (item) => {
    return item.images.length === 0 ? defaultImg : `http://localhost:3000/images/products/${item.images[0]}`;
  }

  render() {
    const {
      products,
      loading,
    } = this.props;
    const { allProducts } = products;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          Total Number: {allProducts.length}. Keep going!
        </p>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="pic"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const addNew = () => {
      router.push('/products/new');
    }
    return (
      <PageHeaderWrapper title="All Products" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...allProducts]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a>Edit</a>, <a>Delete</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={this.getImgAddress(item)} />}
                      title={<a>{item.name}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={6}>
                          <p>
                            <span> Category:</span> <span>{item.category.name}</span>
                          </p>
                          {item.oldPrice !== 0 &&
                            <p>
                              <span>Price Before Discount:</span><span>{item.oldPrice}</span>
                            </p>
                          }
                          <p>
                            <span>Price:</span> <span>{item.newPrice}</span>
                          </p>
                          <p>
                            <span>Promote:</span> <span>{item.promote ? 'yes' : 'no'}</span>
                          </p>
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              )
                :
                (
                  <List.Item>
                    <Button onClick={addNew} type="dashed" className={styles.newButton}>
                      <Icon type="plus" /> Add a new one
                    </Button>
                  </List.Item>
                )
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CardList;
