import React from 'react';
import { connect } from 'dva';
import { Form, Button, Alert, Divider, Upload, Icon } from 'antd';
import router from 'umi/router';
import styles from './style.less';

@connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))
@Form.create()
class Step2 extends React.PureComponent {

  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { validateFields } = form;
    const onPrev = () => {
      router.push('/products/new/info');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    const fileList = [{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }, {
      uid: '-2',
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }];

    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      listType: 'picture',
      defaultFileList: [...fileList],
      className: 'upload-list-inline'
    };

    return (
      <Form layout="horizontal" className={styles.stepForm} style={{ marginTop: 30 }}>
        <Alert
          closable
          showIcon
          message="No more than 3 Images"
          style={{ marginBottom: 24 }}
        />

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
          <Button type="primary" style={{ marginLeft: 8 }} onClick={onValidateForm} loading={submitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step2;
