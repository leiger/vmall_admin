import React, { Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Switch,
  Divider
} from 'antd';
import router from 'umi/router';
import styles from './style.less';


const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ form }) => ({
  data: form.product,
}))
@Form.create()
class Step1 extends React.PureComponent {

  render() {
    const { form, dispatch } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/products/new/images');
        }
      });
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} style={{ marginTop: 30, maxWidth: 1000 }}>
          <FormItem {...formItemLayout} label="Product Name">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please enter a name'
                },
              ],
            })(<Input placeholder="2-50 characters" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Category">
            {getFieldDecorator('category', {
              rules: [{ required: true }],
            })(
              <Select placeholder="Choose a Category">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Price Before Discount">
            {getFieldDecorator('oldPrice')(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Price">
            {getFieldDecorator('newPrice', {
              rules: [{ required: true, message: 'Please enter a price' }],
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Promote">
            {getFieldDecorator('promote')(<Switch />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Num In Stock">
            {getFieldDecorator('numInStock', {
              rules: [{ required: true, message: 'Please enter a num' }],
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Desc">
            {getFieldDecorator('desc')(
              <TextArea
                style={{ minHeight: 32 }}
                placeholder=""
                rows={4}
              />
            )}
          </FormItem>
          <FormItem
            label=""
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 12, offset: 7 },
            }}
          >
            <Button type="primary" onClick={onValidateForm}>
              Next
            </Button>
          </FormItem>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>Instruction:</h3>
          <h4>Product Name:</h4>
          <p>
            min length is 2 characters, max length is 50 characters
          </p>
          <h4>Promote:</h4>
          <p>if check this radio, this product will show before others</p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
