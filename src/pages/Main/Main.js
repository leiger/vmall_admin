import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';
import styles from './Main.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));

@connect(({ user, project, activities, chart, loading }) => ({
  currentUser: user.currentUser,
  project,
  activities,
  chart,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
class Main extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  render() {
    const {
      currentUser,
      currentUserLoading,
      loading: propsLoading,
      chart,
    } = this.props;
    const { visitData } = chart;
    const loading = propsLoading;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              Good Morning
              , {currentUser.name}
              , Happy Everyday！
            </div>
            <div>
              {currentUser.title} |{currentUser.group}
            </div>
          </div>
        </div>
      ) : null;

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
      >
        <Suspense fallback={null}>
          <IntroduceRow loading={loading} visitData={visitData} />
        </Suspense>
      </PageHeaderWrapper>
    );
  }
}

export default Main;
