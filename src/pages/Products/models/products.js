import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getAllProducts } from '@/services/product';

export default {
  namespace: 'products',

  state: {
    // step: {
    //   payAccount: 'ant-design@alipay.com',
    //   receiverAccount: 'test@example.com',
    //   receiverName: 'Alex',
    //   amount: '500',
    // },
    product: {
      category: '',
      name: '',
      oldPrice: '',
      newPrice: '',
      promote: false,
      images:[],
      numInStock: 0,
      desc: []
    }
  },

  effects: {
    // *submitRegularForm({ payload }, { call }) {
    //   yield call(fakeSubmitForm, payload);
    //   message.success('提交成功');
    // },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/products/new/result'));
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(getAllProducts, payload);
      yield put({
        type: 'queryProducts',
        payload: Array.isArray(response) ? response : [],
      });
    },
    // *submitAdvancedForm({ payload }, { call }) {
    //   yield call(fakeSubmitForm, payload);
    //   message.success('提交成功');
    // },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    queryProducts(state, {payload}) {
      return {
        ...state,
        product: {
          ...state.product,
          ...payload,
        },
      };
    }
  },
};
