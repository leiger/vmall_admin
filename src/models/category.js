import { getCategories } from '@/services/category';

export default {
  namespace: 'category',

  state: {
    allCategories: []
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getCategories);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        allCategories:[
          ...payload
        ]
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
