import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import { getAllProducts, putNewProduct } from '@/services/product';

export default {
  namespace: 'products',

  state: {
    // step: {
    //   payAccount: 'ant-design@alipay.com',
    //   receiverAccount: 'test@example.com',
    //   receiverName: 'Alex',
    //   amount: '500',
    // },
    allProducts: [],
    newProduct: {
      categoryId: '',
      name: '',
      oldPrice: 0,
      newPrice: '',
      promote: '',
      images:[],
      numInStock: 0,
      desc: []
    },
    submit: ''
  },

  effects: {
    // *submitRegularForm({ payload }, { call }) {
    //   yield call(fakeSubmitForm, payload);
    //   message.success('提交成功');
    // },
    *submitStepForm({ payload }, { call, put }) {
      yield call(putNewProduct, payload);
      // console.log(response);
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
      console.log(payload);
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          ...payload,
        },
      };
    },
    saveImageAddress(state, {payload}) {
      console.log(payload);
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          images: [
            ...state.newProduct.images,
            payload
          ]
        }
      }
    },
    queryProducts(state, {payload}) {
      return {
        ...state,
        allProducts: [
          ...payload,
        ],
      };
    }
  },
};
