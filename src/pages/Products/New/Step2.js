import React from 'react';
import { connect } from 'dva';
import { Form, Button, Alert, Divider, Upload, Icon } from 'antd';
import router from 'umi/router';
import styles from './style.less';

@connect(({ products, loading }) => ({
  submitting: loading.effects['products/submitStepForm'],
  data: products.newProduct,
}))
@Form.create()
class Step2 extends React.PureComponent {

  render() {
    const { form, data, dispatch, submitting } = this.props;
    const onPrev = () => {
      router.push('/products/new/info');
    };
    const submitForm = e => {
      e.preventDefault();
      dispatch({
        type: 'products/submitStepForm',
        payload: {
          ...data
        },
      });
    };
    const defaultFileList = [];
    data.images.forEach((img, index) => {
      defaultFileList.push({
        url: `http://localhost:3000/images/products/${img}`,
        uid: index,
        status: 'done'
      });
    })

    const props = {
      action: 'http://localhost:3000/api/images',
      listType: 'picture',
      className: 'upload-list-inline',
      defaultFileList,
      onChange: ({ file }) => {
        if (file.status === 'done' && file.response !== undefined) {
          dispatch({
            type: 'products/saveImageAddress',
            payload: file.response
          });
        }
      }
    };

    return (
      <Form layout="horizontal" className={styles.stepForm} style={{ marginTop: 30 }}>
        <Alert
          closable
          showIcon
          message="No more than 3 Images"
          style={{ marginBottom: 24 }}
        />
        <span>{data.promote}</span>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>

        <Divider />
        <Form.Item label="">
          <Button onClick={onPrev}>
            Last Step
          </Button>
          <Button type="primary" style={{ marginLeft: 8 }} onClick={submitForm} loading={submitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step2;
