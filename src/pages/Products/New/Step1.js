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

@connect(({ category, products }) => ({
  category,
  data: products.newProduct
}))
@Form.create()
class Step1 extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'category/fetch',
    });
  }

  render() {
    const { data, dispatch, category, form } = this.props;
    const { allCategories } = category;
    const options = allCategories.map(value =>
      // eslint-disable-next-line no-underscore-dangle
      <Option key={value._id} value={value._id}>{value.name}</Option>
    )
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'products/saveStepFormData',
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
              initialValue: data.name,
              rules: [
                {
                  required: true,
                  message: 'Please enter a name'
                },
              ],
            })(<Input placeholder="2-50 characters" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Category">
            {getFieldDecorator('categoryId', {
              rules: [{ required: true }],
            })(
              <Select placeholder="Choose a Category">
                {options}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Price Before Discount">
            {getFieldDecorator('oldPrice',{
              initialValue: data.oldPrice
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Price">
            {getFieldDecorator('newPrice', {
              initialValue: data.newPrice,
              rules: [{ required: true, message: 'Please enter a price' }],
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Promote">
            {getFieldDecorator('promote',{
              valuePropName: 'checked'
            })(<Switch />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Num In Stock">
            {getFieldDecorator('numInStock', {
              initialValue: data.numInStock,
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
